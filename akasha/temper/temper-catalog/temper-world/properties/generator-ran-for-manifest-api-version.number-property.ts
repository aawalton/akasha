import type { NumberProperty } from "@akasha/pages-system/number-property"

export type GeneratorRanForManifestApiVersion = number

export const generatorRanForManifestApiVersion = {
  id: "01a05fc4-7a92-7ab8-b98f-ca40f8af5eb1",
  pageTypeSlug: "number-property",
  slug: "generator-ran-for-manifest-api-version",
  propertySlug: "generator-ran-for-manifest-api-version",
  definition: "the manifest number the generator last ran for",
  max: null,
} as const satisfies NumberProperty
