import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type VoiceInstruction = string

export const voiceInstruction = {
  id: "01a0536a-42f1-75a1-9d17-e1d2e7827f6a",
  pageTypeSlug: "text-property",
  slug: "voice-instruction",
  propertySlug: "voice-instruction",
  definition: "the description a persona's voice was built from",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
