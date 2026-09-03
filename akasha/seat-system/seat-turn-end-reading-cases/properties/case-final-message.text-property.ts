import type { TextProperty } from "@akasha/pages-system/text-property"

export type CaseFinalMessage = string

export const caseFinalMessage = {
  id: "01a06861-1918-79b0-8713-38951cab9147",
  pageTypeSlug: "text-property",
  slug: "case-final-message",
  propertySlug: "case-final-message",
  definition: "the last thing a seat said before the turn the case keeps ended",
  max: 5000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A final message is the evidence a reading weighs rather than a summary of it.",
    },
  ],
} as const satisfies TextProperty
