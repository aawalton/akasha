import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ManifestApiVersion = number

export const manifestApiVersion = {
  id: "01a05fc4-7a93-7cb8-a27f-186ab86221f2",
  pageTypeSlug: "number-property",
  slug: "manifest-api-version",
  propertySlug: "manifest-api-version",
  definition: "the manifest number a game build carries",
  max: null,
} as const satisfies NumberProperty
