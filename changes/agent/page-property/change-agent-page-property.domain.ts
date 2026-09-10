import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const changeAgentPageProperty = {
  id: "01a0819e-147e-7be9-93f8-801a3b5eea40",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-agent-page-property",
  definition: "a change an agent reaches acting on every page with one property",
  parts: ["change-agent/rename-page-property-property-slug"],
} as const satisfies Domain
