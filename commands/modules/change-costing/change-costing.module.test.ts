import { afterAll, expect, test } from "bun:test"
import {
  CHANGE_APPLY_SLUG,
  CHANGE_DRAFT_SLUG,
  commandPageAt,
} from "akasha/commands/modules/change-costing/change-costing.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { nothingFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

const COMMAND = "command"

const DRAFT_AT = "commands/pages/thrumming/draft/thrum-draft.command.ts"

const DRAFT_ID = "01a08179-3176-7aa0-8d0b-d07d8da49eb2"

const scratch = scratchWorld()

afterAll(() => scratch.sweep())

test("where the page of the command that ran sits is asked of the index", () => {
  const root = scratch.rootFor("change-costing-")
  nothingFiled(root)
  listedFiled(root, COMMAND, CHANGE_DRAFT_SLUG, [{ path: DRAFT_AT, id: DRAFT_ID }])

  expect(commandPageAt(root, CHANGE_DRAFT_SLUG)).toBe(DRAFT_AT)
})

test("a command the index names no page for is refused rather than answered", () => {
  const root = scratch.rootFor("change-costing-")
  nothingFiled(root)

  expect(() => commandPageAt(root, CHANGE_APPLY_SLUG)).toThrow()
})
