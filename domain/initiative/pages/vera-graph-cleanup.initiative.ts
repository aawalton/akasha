import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const veraGraphCleanup = {
  id: "01a0a588-8e33-7e64-bb88-facbefcf62b6",
  type: "initiative",
  slug: "vera-graph-cleanup",
  domain: "domain/graph",
  persona: "persona/vera",
} as const satisfies Initiative
