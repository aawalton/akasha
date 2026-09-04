import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WordsReadSnapshot = number

export const wordsReadSnapshot = {
  id: "01a05fd8-c30f-743a-bfc7-4753f6dd4880",
  pageTypeSlug: "number-property",
  slug: "words-read-snapshot",
  propertySlug: "words-read-snapshot",
  definition: "the lifetime words Alan had read as counted on a day",
  max: null,
} as const satisfies NumberProperty
