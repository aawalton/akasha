import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const epistemic = {
  id: "01a0b6f7-33d9-7623-9db7-4338dfc0d927",
  type: "page-type/text-property",
  slug: "epistemic",
  propertySlug: "epistemic",
  definition: "whether the story asserted a claim or a character made it",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
