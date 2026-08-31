import type { Initiative } from "../initiative.page-type.ts"

export const akashaMigration = {
  id: "01a05324-954d-752a-82d1-e049ecc0f807",
  pageTypeSlug: "initiative",
  slug: "akasha-migration",
  domainSlug: "domain/akasha-migration",
  personaSlug: "akasha",
  constraints: [
    "The initiatives under this one are the states the migration passes through, standing in the order it passes through them.",
  ],
} as const satisfies Initiative
