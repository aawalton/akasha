import type { Domain } from "../../../../domains/domain.page-type.ts"

export const emailRuleMatch = {
  id: "01a0675b-16e8-7e4f-aec4-53ce7ef4bf2d",
  pageTypeSlug: "domain",
  slug: "email-rule-match",
  definition: "which mail an email rule applies to",
  partSlugs: ["domain/email-rule-match-condition"],
} as const satisfies Domain
