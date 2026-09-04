import type { Domain } from "../../../../domain-system/domains/domain.page-type.ts"

export const emailActionNotify = {
  id: "01a0675b-16e4-79c5-b78b-e333b399492e",
  pageTypeSlug: "domain",
  slug: "email-action-notify",
  definition: "telling a person about a piece of their mail",
} as const satisfies Domain
