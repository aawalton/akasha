import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const voiceInstruct = {
  id: "01a0c643-6978-703d-b3cf-507d8a106dcb",
  type: "page-type/text-property",
  slug: "voice-instruct",
  propertySlug: "instruct",
  definition: "how a voice was told to say the words",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
