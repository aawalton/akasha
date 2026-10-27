import { expect, test } from "bun:test"
import { definer } from "akasha/agent/role/pages/definer.role.ts"
import { gameMaster } from "akasha/agent/role/pages/game-master/game-master.role.ts"
import { handler } from "akasha/agent/role/pages/handler.role.ts"
import { alan } from "akasha/alan/alan.domain.ts"
import { alanHarness } from "akasha/alan/harness/alan-harness.domain.ts"
import {
  countsForWallpaper,
  type Keeping,
  marking,
  noSeat,
  notCounted,
  type Seated,
  seatIn,
} from "akasha/command/pages/seat/messaged/seat-messaged.command.code.ts"
import type { Persona } from "akasha/persona/modules/reading/persona-reading.module.code.ts"

const AMY_SEAT: Seated = {
  slug: "amy",
  persona: "amy",
  role: `role/${definer.slug}`,
  assignment: `domain/${alanHarness.slug}`,
}

const HANDLER_SEAT: Seated = {
  slug: "alan",
  persona: "amy",
  role: `role/${handler.slug}`,
  assignment: `domain/${alan.slug}`,
}

const GAME_MASTER_SEAT: Seated = {
  slug: "mari-game-master-hollowmere",
  persona: "mari",
  role: `role/${gameMaster.slug}`,
  assignment: "story-played/hollowmere",
}

const SEATS: readonly Seated[] = [
  AMY_SEAT,
  { slug: "ops", persona: "sophia", role: null, assignment: null },
  { slug: "spare", persona: "", role: null, assignment: null },
]

test("a seat answers the persona that seat states", () => {
  expect(seatIn(SEATS, "amy")?.persona).toBe("amy")
  expect(seatIn(SEATS, "ops")?.persona).toBe("sophia")
})

test("a name that is no seat answers nobody", () => {
  expect(seatIn(SEATS, "nobody")).toBe(null)
  expect(seatIn([], "amy")).toBe(null)
})

test("a seat naming no persona answers nobody", () => {
  expect(seatIn(SEATS, "spare")).toBe(null)
})

test("the refusal names the seat that was asked for", () => {
  expect(noSeat("spare")).toContain("`spare`")
})

test("a seat drawn under the personas counts for the wallpaper", () => {
  expect(countsForWallpaper(AMY_SEAT)).toBe(true)
})

test("a handler's seat does not count for the wallpaper", () => {
  expect(countsForWallpaper(HANDLER_SEAT)).toBe(false)
})

test("a story's seat does not count for the wallpaper", () => {
  expect(countsForWallpaper(GAME_MASTER_SEAT)).toBe(false)
})

test("a seat left out of the wallpaper is named with the section it is drawn under", () => {
  expect(notCounted(HANDLER_SEAT)).toContain("`alan`")
  expect(notCounted(HANDLER_SEAT)).toContain("handlers")
  expect(notCounted(GAME_MASTER_SEAT)).toContain("hollowmere")
})

const AT = new Date("2026-09-12T18:00:00.000Z")

const AMY = { id: "01a0", slug: "amy", path: "nowhere/amy.page.ts" } as Persona

function keeping(stops: keyof Keeping | null, day: number | null): Keeping {
  const halting = (which: keyof Keeping): undefined => {
    if (which === stops) throw new Error(`the lock on ${which} was held`)
    return undefined
  }
  return {
    mark: () => halting("mark"),
    raise: () => {
      halting("raise")
      return day === null ? null : [{ persona: "amy", sent: day }]
    },
    points: () => halting("points"),
  }
}

test("a run that kept every mark names each one", () => {
  const done: string[] = []
  const said = marking("/root", "amy", AMY, AT, null, done, keeping(null, 100))
  expect(said.refusals).toEqual([])
  expect(done).toEqual([
    "marked amy as written to at 2026-09-12T18:00:00.000Z",
    "raised amy's count on today's day",
    "kept amy's points for today",
  ])
})

test("a run stopped on the count names the mark it kept before it stopped", () => {
  const done: string[] = []
  expect(() => marking("/root", "amy", AMY, AT, null, done, keeping("raise", 100))).toThrow(
    "the lock on raise was held"
  )
  expect(done).toEqual(["marked amy as written to at 2026-09-12T18:00:00.000Z"])
})

test("a run stopped on the points names the mark and the count", () => {
  const done: string[] = []
  expect(() => marking("/root", "amy", AMY, AT, null, done, keeping("points", 100))).toThrow(
    "the lock on points was held"
  )
  expect(done).toEqual([
    "marked amy as written to at 2026-09-12T18:00:00.000Z",
    "raised amy's count on today's day",
  ])
})

test("a run stopped on the mark itself names nothing as kept", () => {
  const done: string[] = []
  expect(() => marking("/root", "amy", AMY, AT, null, done, keeping("mark", 100))).toThrow(
    "the lock on mark was held"
  )
  expect(done).toEqual([])
})

test("a day with no page filed under it raises no count and keeps no point", () => {
  const done: string[] = []
  const said = marking("/root", "amy", AMY, AT, null, done, keeping(null, null))
  expect(said.report[1]).toContain("no day page")
  expect(done).toEqual(["marked amy as written to at 2026-09-12T18:00:00.000Z"])
})

test("a run at a seat left out of the wallpaper keeps no mark but keeps the count and points", () => {
  const done: string[] = []
  const unmarked = notCounted(HANDLER_SEAT)
  const said = marking("/root", "amy", AMY, AT, unmarked, done, keeping("mark", 100))
  expect(said.refusals).toEqual([])
  expect(said.report).toContain(unmarked)
  expect(done).toEqual(["raised amy's count on today's day", "kept amy's points for today"])
})
