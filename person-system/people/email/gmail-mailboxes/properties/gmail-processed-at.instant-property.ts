import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type GmailProcessedAt = string

export const gmailProcessedAt = {
  id: "01a06862-a0bc-7798-8e53-c9df3ecdc81f",
  pageTypeSlug: "instant-property",
  slug: "gmail-processed-at",
  propertySlug: "processed-at",
  definition: "when a mailbox settled what to do about a message",
} as const satisfies InstantProperty
