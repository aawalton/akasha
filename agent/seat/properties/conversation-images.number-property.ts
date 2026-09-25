import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const conversationImages = {
  id: "01a0d44c-06c7-75db-b77a-14f967d295ef",
  type: "page-type/number-property",
  slug: "conversation-images",
  propertySlug: "images",
  definition: "the number of images a person sends with the words",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
