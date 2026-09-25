import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeAgentPageProperty = {
  id: "01a0819e-147e-7be9-93f8-801a3b5eea40",
  type: "page-type/domain",
  slug: "change-agent-page-property",
  definition: "a change an agent makes to every page with a property",
  parts: [
    "change-agent/add-page-property",
    "change-agent/remove-page-property",
    "change-agent/rename-page-property-property-slug",
  ],
} as const satisfies Domain
