import { expect, test } from "bun:test"
import { handler } from "akasha/agent/role/pages/handler.role.ts"
import {
  HANDLERS,
  PERSONAS,
} from "akasha/agent/seat/fleet/modules/seat-section/seat-section.computed-property-module.code.ts"
import { work } from "akasha/agent/seat/properties/seat-section.computed-property.code.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"

const REACH = {
  target: () => null,
  through: () => null,
  naming: () => [],
  file: () => null,
  folder: () => null,
} as Reach

const HANDLER = `role/${handler.slug}`

const OTHER_ROLE = "rank/other"

test("a handler's seat states the handlers section", () => {
  expect(work({ role: HANDLER, assignmentSlug: "work/somewhere" }, REACH)).toBe(HANDLERS)
})

test("a seat assigned a game states that game's section", () => {
  expect(work({ role: OTHER_ROLE, assignmentSlug: "story-played/a-game" }, REACH)).toBe("a-game")
})

test("any other seat states the personas section", () => {
  expect(work({ role: OTHER_ROLE, assignmentSlug: "work/somewhere" }, REACH)).toBe(PERSONAS)
  expect(work({}, REACH)).toBe(PERSONAS)
})
