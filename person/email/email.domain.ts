import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const email = {
  id: "01a0675b-16e0-7215-9513-396b136194b4",
  type: "page-type/domain",
  slug: "email",
  definition: "the email a person sends and receives",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "email" }],
  parts: [
    "domain/email-action",
    "domain/email-rule-delay",
    "domain/email-rule-match",
    "page-type/email-message",
    "page-type/gmail-mailbox",
  ],
  createdAt: "2026-09-03T13:00:18.016Z",
  updatedAt: "2026-09-22T00:11:08.000Z",
} as const satisfies Domain
