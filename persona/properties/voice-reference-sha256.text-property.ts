import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const voiceReferenceSha256 = {
  id: "01a05371-10f9-7dc5-a098-9147c124e172",
  type: "page-type/text-property",
  slug: "voice-reference-sha256",
  propertySlug: "voice-reference-sha256",
  definition: "the checksum of a persona's voice recording",
  maxLength: 64,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-08-30T16:11:53.977Z",
  updatedAt: "2026-09-22T14:05:26.000Z",
} as const satisfies TextProperty
