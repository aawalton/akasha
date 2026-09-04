import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BuildNumber = number

export const buildNumber = {
  id: "01a0685d-b81f-75e5-b86d-859560a551af",
  pageTypeSlug: "number-property",
  slug: "build-number",
  propertySlug: "build-number",
  definition: "which build of its app a cut is",
  max: null,
} as const satisfies NumberProperty
