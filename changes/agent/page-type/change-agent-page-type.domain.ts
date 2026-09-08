import type { Domain } from "../../../domains/domain.page-type.ts"

export const changeAgentPageType = {
  id: "01a08177-7464-70c4-9d4f-669e59f03969",
  pageTypeSlug: "domain",
  slug: "change-agent-page-type",
  definition: "a change an agent reaches acting on every page of one page type",
  partSlugs: [
    "change-agent/add-copied-property-to-every-page",
    "change-agent/add-property-to-every-page",
  ],
} as const satisfies Domain
