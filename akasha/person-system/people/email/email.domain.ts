import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const email = {
  id: "01a0675b-16e0-7215-9513-396b136194b4",
  pageTypeSlug: "domain",
  slug: "email",
  definition: "the email a person sends and receives",
  partSlugs: ["domain/email-action", "domain/email-rule-delay", "domain/email-rule-match"],
} as const satisfies Domain
