import { expect, test } from "bun:test"
import { CHOSEN } from "akasha/commands/pages/change/draft/change-draft.command.code.ts"

test("a draft keeps the edits rather than landing them", () => {
  expect(CHOSEN.drafts).toBe(true)
})

test("a draft bars the key saying what a commit is for", () => {
  expect(CHOSEN.barred).toContain("message")
})

test("a draft bars the key the word naming it already says", () => {
  expect(CHOSEN.barred).toContain("draft")
})

test("a draft names itself in the refusal a barred key draws", () => {
  expect(CHOSEN.said).toBe("draft")
})
