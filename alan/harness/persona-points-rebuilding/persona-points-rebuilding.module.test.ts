import { expect, test } from "bun:test"
import { rebuiltOver, saidOf } from "./persona-points-rebuilding.module.code.ts"

const SENT: ReadonlyMap<string, number> = new Map([
  ["aura", 250],
  ["nobody", 400],
])

test("a hundred messages is kept as one point", () => {
  const kept = new Map<string, number>()
  rebuiltOver(SENT, (slug, points) => {
    kept.set(slug, points)
    return true
  })
  expect(kept.get("aura")).toBe(2.5)
})

test("every persona kept is counted as rebuilt", () => {
  expect(rebuiltOver(SENT, () => true).rebuilt).toBe(2)
})

test("a name no persona is filed under is said rather than counted", () => {
  const done = rebuiltOver(SENT, (slug) => slug !== "nobody")
  expect(done.rebuilt).toBe(1)
  expect(done.unread).toEqual([
    "nobody — no persona is filed under this name, so her count is counted against nobody",
  ])
})

test("no persona counted rebuilds nobody", () => {
  expect(rebuiltOver(new Map(), () => true).rebuilt).toBe(0)
})

test("one persona rebuilt is said in the singular", () => {
  expect(saidOf(1)).toBe("1 persona was rebuilt from the days before today")
})

test("more than one persona rebuilt is said in the plural", () => {
  expect(saidOf(4)).toBe("4 personas were rebuilt from the days before today")
})
