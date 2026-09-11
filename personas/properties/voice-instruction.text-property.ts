import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const voiceInstruction = {
  id: "01a0536a-42f1-75a1-9d17-e1d2e7827f6a",
  type: "text-property",
  slug: "voice-instruction",
  propertySlug: "voice-instruction",
  definition: "the description a persona's voice was built from",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
