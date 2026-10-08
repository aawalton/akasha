import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const rateLimitTier = {
  id: "01a054d8-1d39-7f41-9807-f31d695573c1",
  type: "page-type/text-property",
  slug: "rate-limit-tier",
  propertySlug: "rate-limit-tier",
  definition: "the name of a model account's limits",
  maxLength: 50,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rate limit tier is answered by the upstream probe rather than chosen here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tier is written as Anthropic spells that tier.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T22:44:04.537Z",
  updatedAt: "2026-09-25T18:03:52.000Z",
} as const satisfies TextProperty
