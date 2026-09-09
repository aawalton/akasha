import type { TextProperty } from "@akasha/pages/text-property"

export type GmailDecision = string

export const gmailDecision = {
  id: "01a06862-a0bc-7f55-8d40-b7436ef558a4",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "gmail-decision",
  propertySlug: "decision",
  definition: "what was settled about a message the mailbox went through",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
