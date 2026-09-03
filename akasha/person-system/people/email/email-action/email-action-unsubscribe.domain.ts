import type { Domain } from "../../../../domain-system/domains/domain.page-type.ts"

export const emailActionUnsubscribe = {
  id: "01a0675b-16e6-7f0b-8d21-99bb1fc872bc",
  pageTypeSlug: "domain",
  slug: "email-action-unsubscribe",
  definition: "telling a sender to stop sending",
} as const satisfies Domain
