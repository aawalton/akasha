import { expect, test } from "bun:test"
import { groupsUnreadIn, unreadIn } from "./group-readings.ts"

// The two groups Alan's status bar draws.
const DRAWN_GROUPS = ["upkeep", "inboxes"] as const

function light(label: string, reading: string, readingHeld?: string) {
  return readingHeld === undefined ? { label, reading } : { label, reading, readingHeld }
}

test("a light carrying a figure is read, whatever colour it came out", () => {
  expect(unreadIn([light("Sleep", "7.5"), light("Plants", "0")])).toEqual([])
})

// THE FAULT THIS EXISTS FOR. Three lights, right count, no readings behind any of them.
test("a light carrying no figure is named, with what the absence is", () => {
  const unread = unreadIn([
    light("Email", "", "stale"),
    light("Tasks", "", "stale"),
    light("Temper tasks", "", "none"),
  ])
  expect(unread).toEqual([
    { label: "Email", held: "stale" },
    { label: "Tasks", held: "stale" },
    { label: "Temper tasks", held: "none" },
  ])
})

// A reading of zero is a reading. `stoplightOf` draws it black because it reaches no rung, and it
// carries its figure, so this must not call it unread — two upkeep lights stand exactly there.
test("a real reading that reaches no rung is not an unread light", () => {
  expect(unreadIn([light("Activity", "0"), light("Plants", "0")])).toEqual([])
})

test("a light with no figure and no stated hold is counted as never taken", () => {
  expect(unreadIn([light("Email", "")])).toEqual([{ label: "Email", held: "none" }])
})

// THE LIVE CHECK. Read against the running store rather than a fixture, so a reading service that
// has stopped writing shows up here by the name of the light it stopped writing for.
test("every light Alan's status bar draws stands for a reading", async () => {
  expect(await groupsUnreadIn(DRAWN_GROUPS)).toEqual([])
})
