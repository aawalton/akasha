import { expect, test } from "bun:test"
import { CHOSEN } from "./change-apply.command.code.ts"

test("an apply lands rather than keeps", () => {
  expect(CHOSEN.drafts).toBe(false)
})

test("an apply bars the key that would keep the edits back", () => {
  expect(CHOSEN.barred).toEqual(["draft"])
})

test("an apply takes the key saying what the commit is for", () => {
  expect(CHOSEN.barred).not.toContain("message")
})

test("an apply names itself in the refusal a barred key draws", () => {
  expect(CHOSEN.said).toBe("apply")
})
