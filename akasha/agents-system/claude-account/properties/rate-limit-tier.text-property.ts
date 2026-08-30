import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type RateLimitTier = string

export const rateLimitTier = {
  id: "01a054d8-1d39-7f41-9807-f31d695573c1",
  pageTypeSlug: "text-property",
  slug: "rate-limit-tier",
  propertySlug: "rate-limit-tier",
  definition: "the band the size of the account's allowance is set by",
  max: 50,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This is answered by the upstream probe rather than chosen here.",
    },
    {
      invariantKind: "departure",
      statement: "A tier is written as Anthropic spells it.",
    },
  ],
} as const satisfies TextProperty
