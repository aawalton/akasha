import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const model = {
  id: "01a0540e-fc4c-78a0-9a17-7e166f927315",
  type: "page-type/text-property",
  slug: "model",
  propertySlug: "model",
  definition: "the model family a kind's subagents answer on",
  maxLength: 40,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
