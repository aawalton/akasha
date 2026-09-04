import type { TextProperty } from "@akasha/pages-system/text-property"

export type ComputerModel = string

export const computerModel = {
  id: "01a0658c-329a-7085-b54e-1c4b05e95b9c",
  pageTypeSlug: "text-property",
  slug: "computer-model",
  propertySlug: "computer-model",
  definition: "what the maker calls it",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
