import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeAgentPageProperty = {
  id: "01a0819e-147e-7be9-93f8-801a3b5eea40",
  type: "domain",
  slug: "change-agent-page-property",
  definition: "a change an agent reaches acting on every page with one property",
  parts: [
    "change-agent/rename-page-property-property-slug",
    "change-agent/add-page-property-types",
    "change-agent/add-file-property-extensions",
    "change-agent/change-calculation-held-type",
  ],
} as const satisfies Domain
