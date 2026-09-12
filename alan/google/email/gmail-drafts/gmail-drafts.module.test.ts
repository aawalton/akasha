import { expect, test } from "bun:test"
import { draftedSaid } from "akasha/alan/google/email/gmail-drafts/gmail-drafts.module.code.ts"

test("a draft gmail holds names everyone it is addressed to", () => {
  expect(draftedSaid(["one@example.com", "two@example.com"])).toContain(
    "one@example.com, two@example.com"
  )
})
