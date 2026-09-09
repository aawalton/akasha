import type { TextProperty } from "@akasha/pages/text-property"

export type VoiceReferenceSha256 = string

export const voiceReferenceSha256 = {
  id: "01a05371-10f9-7dc5-a098-9147c124e172",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "voice-reference-sha256",
  propertySlug: "voice-reference-sha256",
  definition: "the checksum of the recording a persona's voice is copied from",
  maxLength: 64,
  nameFormat: null,
} as const satisfies TextProperty
