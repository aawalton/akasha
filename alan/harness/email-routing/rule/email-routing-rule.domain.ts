import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const emailRoutingRule = {
  id: "01a18d83-d51f-794e-8ad4-e6e3dc2bbbae",
  type: "page-type/domain",
  slug: "email-routing-rule",
  definition: "a Cloudflare rule for the email of an email address",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "email routing rule" },
    { partOfSpeech: "part-of-speech/noun", spelling: "email routing rules" },
  ],
  createdAt: "2026-10-30T15:53:09.662Z",
  updatedAt: "2026-10-30T15:53:09.662Z",
} as const satisfies Domain
