import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BuildTargetCount = number

export const buildTargetCount = {
  id: "01a06862-c4ee-70c5-9850-11bd6c7f9df0",
  pageTypeSlug: "number-property",
  slug: "build-target-count",
  propertySlug: "target-count",
  definition: "how many characters are aimed at this build",
  max: null,
} as const satisfies NumberProperty
