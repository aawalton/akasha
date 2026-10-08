import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const emailRuleMatch = {
  id: "01a0675b-16e8-7e4f-aec4-53ce7ef4bf2d",
  type: "page-type/domain",
  slug: "email-rule-match",
  definition: "which mail an email rule applies to",
  parts: ["domain/email-rule-match-condition"],
  createdAt: "2026-09-03T13:00:18.024Z",
  updatedAt: "2026-09-15T16:35:22.000Z",
} as const satisfies Domain
