import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Model = string

export const model = {
  id: "01a05035-2609-7c1b-a33c-d7689fbd2da9",
  pageTypeSlug: "text-property",
  slug: "model",
  definition: "the model answering in a seat",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
