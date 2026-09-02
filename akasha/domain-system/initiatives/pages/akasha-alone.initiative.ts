import type { Initiative } from "../initiative.page-type.ts"

export const akashaAlone = {
  id: "01a05324-954d-70c5-aefd-044e95822b48",
  pageTypeSlug: "initiative",
  slug: "akasha-alone",
  domainSlug: "domain/akasha",
  personaSlug: "akasha",
  parentSlug: "akasha-migration",
  intents: [
    { statement: "Nothing in the repository is outside the akasha system." },
    { statement: "The akasha folder is the repository root." },
  ],
} as const satisfies Initiative
