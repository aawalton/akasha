import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import {
  type Completion,
  claimedAt,
  type Deps,
  type Hooked,
  ranOnce,
  stampKey,
  verdictFor,
} from "akasha/alan/track/to-do/modules/on-complete-running/on-complete-running.module.code.ts"

const NOW = new Date("2026-10-09T12:00:00.000Z")

const EARLIER = "2026-10-09T11:01:33.322Z"

const LATER = "2026-10-09T12:30:00.000Z"

const ROOT = mkdtempSync("/var/tmp/on-complete-running-")

afterAll(() => {
  rmSync(ROOT, { recursive: true, force: true })
})

function hookedAt(slug: string, stamp: string | null): Hooked {
  return {
    path: `to-do/${slug}/${slug}.to-do.ts`,
    slug,
    values: stamp === null ? { slug } : { slug, [stampKey()]: stamp },
    code: `to-do/${slug}/${slug}.to-do.on-complete.code.ts`,
  }
}

function depsOver(
  hooked: readonly Hooked[],
  verdicts: Readonly<Record<string, ReturnType<typeof verdictFor>>>,
  loaded: Readonly<Record<string, unknown>>,
  ran: Completion[]
): Deps {
  return {
    hooked: () => hooked,
    claim: (one) => verdicts[one.slug] ?? { act: "none", doneAt: EARLIER },
    load: async (code) => {
      const held = loaded[code]
      if (held === undefined) throw new Error(`nothing at ${code}`)
      return {
        onComplete: async (completion: Completion) => {
          ran.push(completion)
          if (held instanceof Error) throw held
        },
      }
    },
  }
}

test("the completion stamp read is the one the task lifecycle states for a to-do", () => {
  expect(stampKey()).toBe("toDoLastCompletedAt")
})

test("a to-do seen first is done with its last completion and runs nothing", () => {
  expect(verdictFor(EARLIER, null, NOW)).toEqual({ act: "seed", doneAt: EARLIER })
})

test("a to-do seen first that was never completed is done with the present", () => {
  expect(verdictFor(null, null, NOW)).toEqual({ act: "seed", doneAt: NOW.toISOString() })
})

test("a completion later than the one the to-do is done with runs", () => {
  expect(verdictFor(LATER, EARLIER, NOW)).toEqual({ act: "run", doneAt: LATER })
})

test("a completion at or before the one the to-do is done with runs nothing", () => {
  expect(verdictFor(EARLIER, EARLIER, NOW).act).toBe("none")
  expect(verdictFor(EARLIER, LATER, NOW).act).toBe("none")
})

test("a to-do no longer completed runs nothing and keeps what it is done with", () => {
  expect(verdictFor(null, EARLIER, NOW)).toEqual({ act: "none", doneAt: EARLIER })
})

test("a claim is kept beside the to-do, so a later run never claims that completion again", () => {
  expect(claimedAt(ROOT, hookedAt("drink", EARLIER), NOW).act).toBe("seed")
  expect(claimedAt(ROOT, hookedAt("drink", EARLIER), NOW).act).toBe("none")
  expect(claimedAt(ROOT, hookedAt("drink", LATER), NOW)).toEqual({ act: "run", doneAt: LATER })
  expect(claimedAt(ROOT, hookedAt("drink", LATER), NOW).act).toBe("none")
})

test("a run hands the code the to-do's slug, its values and the instant it was completed", async () => {
  const one = hookedAt("drink", LATER)
  const ran: Completion[] = []
  const said = await ranOnce(
    depsOver([one], { drink: { act: "run", doneAt: LATER } }, { [one.code]: true }, ran),
    NOW
  )
  expect(ran).toEqual([{ slug: "drink", values: one.values, completedAt: new Date(LATER) }])
  expect(said.wrong).toEqual([])
  expect(said.said[0]).toContain("drink")
})

test("a to-do seen first or already done with loads no code", async () => {
  const ran: Completion[] = []
  const said = await ranOnce(
    depsOver(
      [hookedAt("first", EARLIER), hookedAt("done", EARLIER)],
      { first: { act: "seed", doneAt: EARLIER } },
      {},
      ran
    ),
    NOW
  )
  expect(ran).toEqual([])
  expect(said.wrong).toEqual([])
  expect(said.said).toHaveLength(1)
})

test("code that throws is reported, and the other to-dos still run", async () => {
  const bad = hookedAt("bad", LATER)
  const good = hookedAt("good", LATER)
  const ran: Completion[] = []
  const said = await ranOnce(
    depsOver(
      [bad, good],
      { bad: { act: "run", doneAt: LATER }, good: { act: "run", doneAt: LATER } },
      { [bad.code]: new Error("the food would not land"), [good.code]: true },
      ran
    ),
    NOW
  )
  expect(ran.map((one) => one.slug)).toEqual(["bad", "good"])
  expect(said.wrong).toHaveLength(1)
  expect(said.wrong[0]).toContain("the food would not land")
})

test("code exporting no on-complete function is reported rather than skipped", async () => {
  const one = hookedAt("bare", LATER)
  const said = await ranOnce(
    {
      hooked: () => [one],
      claim: () => ({ act: "run", doneAt: LATER }),
      load: async () => ({}),
    },
    NOW
  )
  expect(said.wrong[0]).toContain("exports no `onComplete` function")
})
