import { expect, test } from "bun:test"
import { handler } from "akasha/agent/role/pages/handler.role.ts"
import {
  HANDLERS,
  PERSONAS,
  seatSectionOf,
} from "akasha/agent/seat/fleet/modules/seat-section/seat-section.computed-property-module.code.ts"

const HANDLER = `role/${handler.slug}`

const OTHER_ROLE = "rank/other"

const WORK = "work/somewhere"

const GAME = "story-played/a-game"

test("a seat in the handler role is drawn under the handlers", () => {
  expect(seatSectionOf(HANDLER, WORK)).toBe(HANDLERS)
  expect(seatSectionOf(handler.slug, WORK)).toBe(HANDLERS)
})

test("a seat assigned a game is drawn under that game", () => {
  expect(seatSectionOf(OTHER_ROLE, GAME)).toBe("a-game")
})

test("a seat assigned a written story is drawn under that story", () => {
  expect(seatSectionOf(OTHER_ROLE, "story-written/a-story")).toBe("a-story")
})

test("a handler assigned a game is still drawn under the handlers", () => {
  expect(seatSectionOf(HANDLER, GAME)).toBe(HANDLERS)
})

test("every other seat is drawn under the personas", () => {
  expect(seatSectionOf(OTHER_ROLE, WORK)).toBe(PERSONAS)
  expect(seatSectionOf(null, null)).toBe(PERSONAS)
})
