import type { TextProperty } from "@akasha/pages-system/text-property"

export type GmailDecision = string

export const gmailDecision = {
  id: "01a06862-a0bc-7f55-8d40-b7436ef558a4",
  pageTypeSlug: "text-property",
  slug: "gmail-decision",
  propertySlug: "decision",
  definition: "what was settled about a message the mailbox went through",
  max: 40,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
