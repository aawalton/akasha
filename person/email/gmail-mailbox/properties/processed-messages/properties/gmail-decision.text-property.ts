import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const gmailDecision = {
  id: "01a06862-a0bc-7f55-8d40-b7436ef558a4",
  type: "page-type/text-property",
  slug: "gmail-decision",
  propertySlug: "decision",
  definition: "what the mailbox settled about a message",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
