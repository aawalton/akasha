import { expect, test } from "bun:test"
import { chapterClockOf } from "akasha/story/world/stories/written/chapters/modules/chapter-panels/chapter-panels.module.code.tsx"

const BEATS = [
  '{"beat":1,"event":"Morning.","at":"2026-06-01T04:00:00.000Z","place":"place/home"}',
  '{"beat":2,"event":"Noon."}',
  '{"beat":3,"event":"Night.","at":"2026-06-01T23:00:00.000Z"}',
  '{"beat":4,"event":"Asleep."}',
].join("\n")

test("a chapter's clock is the last time its beats set", () => {
  expect(chapterClockOf(BEATS)).toBe("Monday, June 1 · 11:00 PM")
})

test("beats setting no time, beats not read yet and beats refused give no clock", () => {
  expect(chapterClockOf('{"beat":1,"event":"Morning."}')).toBeNull()
  expect(chapterClockOf(null)).toBeNull()
  expect(chapterClockOf('{"beat":2,"event":"Out of order."}')).toBeNull()
})
