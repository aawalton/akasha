import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeAgentPageType = {
  id: "01a08177-7464-70c4-9d4f-669e59f03969",
  type: "domain",
  slug: "change-agent-page-type",
  definition: "a change an agent reaches acting on every page of one page type",
  parts: [
    "change-agent/add-page-type-types",
    "change-agent/add-property-to-every-page",
    "change-agent/add-property-to-page-type",
    "change-agent/copy-property-on-every-page",
    "change-agent/move-property-on-every-page",
    "change-agent/remove-every-page-of-a-type",
    "change-agent/remove-property-from-every-page",
    "change-agent/remove-property-from-page-type",
    "change-agent/sort-property-values-on-every-page",
  ],
} as const satisfies Domain
