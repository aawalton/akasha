import { expect, test } from "bun:test"
import { groupsUnreadIn, unreadIn } from "./readout-unread.module.code.ts"

const DRAWN_GROUPS = ["upkeep", "inboxes"] as const

function light(label: string, reading: string, readingHeld?: string) {
  return readingHeld === undefined ? { label, reading } : { label, reading, readingHeld }
}

test("a light carrying a figure is read, whatever color the light came out", () => {
  expect(unreadIn([light("Sleep", "7.5"), light("Plants", "0")])).toEqual([])
})

test("three lights of the right count carrying no reading are each named", () => {
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

test("a real reading that reaches no rung is not an unread light", () => {
  expect(unreadIn([light("Activity", "0"), light("Plants", "0")])).toEqual([])
})

test("a light with no figure and no stated hold is counted as never taken", () => {
  expect(unreadIn([light("Email", "")])).toEqual([{ label: "Email", held: "none" }])
})

test("every light Alan's status bar draws carries a reading", async () => {
  expect(await groupsUnreadIn(DRAWN_GROUPS)).toEqual([])
})
