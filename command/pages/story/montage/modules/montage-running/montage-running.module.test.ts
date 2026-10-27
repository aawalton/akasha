import { expect, test } from "bun:test"
import {
  MOST_SESSIONS,
  type Montage,
  montageRan,
  type Rules,
} from "akasha/command/pages/story/montage/modules/montage-running/montage-running.module.code.ts"

const TIME = "world-check/time"

const DRILL = "world-check/drill"

const BOARD = "world-check/board"

const DAY = 24 * 60

const OPENS = "2026-01-01T08:00:00.000Z"

function after(days: number): string {
  return new Date(Date.parse(OPENS) + days * DAY * 60_000).toISOString()
}

function rulesWith(faces: readonly number[]): Rules & { readonly seen: string[] } {
  const seen: string[] = []
  let thrown = 0
  return {
    seen,
    cast: (before, place) => {
      seen.push(`${place}:${before === null ? "none" : JSON.parse(before).check}`)
      const face = faces[thrown % faces.length] ?? 1
      thrown += 1
      return { answered: { stated: { seed: `seed-${place}` }, roll: face } }
    },
    settle: async (check, reading, roll) => {
      const read = reading as Readonly<Record<string, unknown>>
      if (check === TIME) {
        const ends = Date.parse(String(read["from"])) + Number(read["minutes"]) * 60_000
        return { answered: { answered: { endsAt: new Date(ends).toISOString() }, added: [] } }
      }
      if (check === BOARD) {
        const coin = Number(read["coin"])
        if (coin < 3) return { refused: "cannot pay" }
        const added = [{ page: "p", key: "c", by: -3 }]
        return { answered: { answered: { left: coin - 3 }, added } }
      }
      const gained = roll === 1 ? 0 : 1
      const experience = Number(read["experience"]) + gained
      const added = gained === 0 ? [] : [{ page: "s", key: "e", by: gained }]
      return { answered: { answered: { experience, hurt: roll === 1 }, added } }
    },
    next: (check, reading, answered) => {
      const said = answered as Readonly<Record<string, unknown>>
      if (check === BOARD) {
        const coin = Number(said["left"])
        return { answered: { reading: { coin }, crossed: [], left: coin < 3 ? "broke" : null } }
      }
      const was = Number((reading as Readonly<Record<string, unknown>>)["experience"])
      const now = Number(said["experience"])
      const rung = Math.floor(now / 10)
      const crossed = rung > Math.floor(was / 10) ? [`rung ${rung}`] : []
      const left = said["hurt"] === true ? "hurt" : null
      return { answered: { reading: { experience: now }, crossed, left } }
    },
  }
}

function montage(over: Partial<Montage> = {}): Montage {
  return {
    time: TIME,
    activity: { check: DRILL, reading: { experience: 5 }, dice: "1d20" },
    upkeep: null,
    from: OPENS,
    every: DAY,
    bounds: { sessions: 3, until: null, crossing: null },
    interruptsAt: null,
    before: null,
    place: 0,
    ...over,
  }
}

test("each session passes time, then rolls the activity chained from the line before", async () => {
  const rules = rulesWith([10])
  const said = await montageRan(montage(), rules)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.answered.sessions).toHaveLength(3)
  expect(said.answered.stopped).toBe("sessions")
  expect(said.answered.endsAt).toBe(after(3))
  expect(said.answered.lines.map((one) => [one["check"], one["session"]])).toEqual([
    [TIME, 1],
    [DRILL, 1],
    [TIME, 2],
    [DRILL, 2],
    [TIME, 3],
    [DRILL, 3],
  ])
  expect(rules.seen).toEqual([`1:${TIME}`, `3:${TIME}`, `5:${TIME}`])
  expect(said.answered.added).toHaveLength(3)
})

test("the activity carries its reading on from one session to the next", async () => {
  const said = await montageRan(montage(), rulesWith([10]))
  if ("refused" in said) throw new Error(said.refused)
  const readings = said.answered.lines.filter((one) => one["check"] === DRILL)
  expect(readings.map((one) => one["reading"])).toEqual([
    { experience: 5 },
    { experience: 6 },
    { experience: 7 },
  ])
})

test("a montage stops after the session crossing what was asked for", async () => {
  const bounds = { sessions: null, until: null, crossing: "rung 1" }
  const said = await montageRan(montage({ bounds }), rulesWith([10]))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.answered.stopped).toBe("crossing")
  expect(said.answered.sessions).toHaveLength(5)
  expect(said.answered.sessions.at(-1)?.crossed).toEqual(["rung 1"])
})

test("a montage stops after a session that leaves the routine", async () => {
  const said = await montageRan(montage(), rulesWith([10, 1]))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.answered.stopped).toBe("left")
  expect(said.answered.why).toBe("hurt")
  expect(said.answered.sessions).toHaveLength(2)
})

test("no session runs past the end asked for", async () => {
  const bounds = { sessions: null, until: after(2.5), crossing: null }
  const said = await montageRan(montage({ bounds }), rulesWith([10]))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.answered.stopped).toBe("until")
  expect(said.answered.sessions).toHaveLength(2)
  expect(said.answered.endsAt).toBe(after(2))
})

test("the world breaking in stops before that session, with time passed up to it", async () => {
  const said = await montageRan(montage({ interruptsAt: after(1.5) }), rulesWith([10]))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.answered.stopped).toBe("interrupted")
  expect(said.answered.sessions).toHaveLength(1)
  expect(said.answered.endsAt).toBe(after(1.5))
  expect(said.answered.lines.at(-1)?.["reading"]).toEqual({ from: after(1), minutes: DAY / 2 })
})

test("upkeep is charged every session, and a session it cannot pay for is not run", async () => {
  const upkeep = { check: BOARD, reading: { coin: 10 }, dice: null }
  const bounds = { sessions: 10, until: null, crossing: null }
  const said = await montageRan(montage({ upkeep, bounds }), rulesWith([10]))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.answered.sessions).toHaveLength(3)
  expect(said.answered.stopped).toBe("left")
  expect(said.answered.why).toBe("broke")
  expect(said.answered.added.filter((one) => one.page === "p")).toHaveLength(3)
})

test("a first session refused refuses the montage", async () => {
  const upkeep = { check: BOARD, reading: { coin: 1 }, dice: null }
  expect(await montageRan(montage({ upkeep }), rulesWith([10]))).toHaveProperty("refused")
})

test("a montage bounded by a crossing alone stops at the most sessions", async () => {
  const bounds = { sessions: null, until: null, crossing: "never" }
  const said = await montageRan(montage({ every: 1, bounds }), rulesWith([10]))
  if ("refused" in said) throw new Error(said.refused)
  expect(said.answered.stopped).toBe("most")
  expect(said.answered.sessions).toHaveLength(MOST_SESSIONS)
})
