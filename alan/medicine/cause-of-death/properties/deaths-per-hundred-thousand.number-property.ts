import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const deathsPerHundredThousand = {
  id: "01a183bf-b6a0-735f-ac47-4283a88d5045",
  type: "page-type/number-property",
  slug: "deaths-per-hundred-thousand",
  propertySlug: "deaths-per-hundred-thousand",
  definition:
    "the deaths from a cause of death in a year for every hundred thousand US men in an age band",
  max: null,
  types: "ts",
  createdAt: "2026-10-28T18:22:21.854Z",
  updatedAt: "2026-10-30T16:10:15.199Z",
} as const satisfies NumberProperty
