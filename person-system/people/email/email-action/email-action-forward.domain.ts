import type { Domain } from "../../../../domains/domains/domain.page-type.ts"

export const emailActionForward = {
  id: "01a0675b-16e3-7354-b8d1-c5d553d18cc6",
  pageTypeSlug: "domain",
  slug: "email-action-forward",
  definition: "sending a copy of a person's mail to someone else",
} as const satisfies Domain
