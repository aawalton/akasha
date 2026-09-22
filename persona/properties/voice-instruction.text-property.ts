import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const voiceInstruction = {
  id: "01a0536a-42f1-75a1-9d17-e1d2e7827f6a",
  type: "page-type/text-property",
  slug: "voice-instruction",
  propertySlug: "voice-instruction",
  definition: "a persona's voice description",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
