import type { TextProperty } from "@akasha/pages/text-property"

export type Model = string

export const model = {
  id: "01a0540e-fc4c-78a0-9a17-7e166f927315",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "model",
  propertySlug: "model",
  definition: "the model answering in a seat",
  maxLength: 40,
  nameFormat: null,
} as const satisfies TextProperty
