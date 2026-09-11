import { expect, test } from "bun:test"
import {
  rebuiltOver,
  saidOf,
} from "akasha/alan/harness/persona-points-rebuilding/persona-points-rebuilding.module.code.ts"

const BEFORE: ReadonlyMap<string, number> = new Map([
  ["aura", 250],
  ["nobody", 400],
])

const TODAY: ReadonlyMap<string, number> = new Map([
  ["aura", 50],
  ["amy", 75],
])

type Kept = { readonly before: number; readonly today: number }

const keptOver = (
  before: ReadonlyMap<string, number>,
  today: ReadonlyMap<string, number>
): ReadonlyMap<string, Kept> => {
  const kept = new Map<string, Kept>()
  rebuiltOver(before, today, (slug, one, two) => {
    kept.set(slug, { before: one, today: two })
    return true
  })
  return kept
}

test("a hundred messages is kept as one point", () => {
  expect(keptOver(BEFORE, TODAY).get("aura")).toEqual({ before: 2.5, today: 0.5 })
})

test("a persona written to only today carries nothing before today", () => {
  expect(keptOver(BEFORE, TODAY).get("amy")).toEqual({ before: 0, today: 0.75 })
})

test("a persona written to on no day of today's carries nothing today", () => {
  expect(keptOver(BEFORE, TODAY).get("nobody")).toEqual({ before: 4, today: 0 })
})

test("every persona of either run is counted as rebuilt", () => {
  expect(rebuiltOver(BEFORE, TODAY, () => true).rebuilt).toBe(3)
})

test("a name no persona is filed under is said rather than counted", () => {
  const done = rebuiltOver(BEFORE, TODAY, (slug) => slug !== "nobody")
  expect(done.rebuilt).toBe(2)
  expect(done.unread).toEqual([
    "nobody — no persona is filed under this name, so her count is counted against nobody",
  ])
})

test("no persona counted rebuilds nobody", () => {
  expect(rebuiltOver(new Map(), new Map(), () => true).rebuilt).toBe(0)
})

test("one persona rebuilt is said in the singular", () => {
  expect(saidOf(1)).toBe("1 persona was rebuilt from the days counted")
})

test("more than one persona rebuilt is said in the plural", () => {
  expect(saidOf(4)).toBe("4 personas were rebuilt from the days counted")
})
