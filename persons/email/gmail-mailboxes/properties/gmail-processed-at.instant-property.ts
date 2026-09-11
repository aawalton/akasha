import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const gmailProcessedAt = {
  id: "01a06862-a0bc-7798-8e53-c9df3ecdc81f",
  type: "instant-property",
  slug: "gmail-processed-at",
  propertySlug: "processed-at",
  definition: "when a mailbox settled what to do about a message",
  types: "ts",
} as const satisfies InstantProperty
