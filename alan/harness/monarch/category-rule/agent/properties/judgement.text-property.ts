import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const judgement = {
  id: "01a0680c-3c00-7006-b482-7d1f5a8c3107",
  type: "page-type/text-property",
  slug: "judgement",
  propertySlug: "judgement",
  definition: "what an agent catching a transaction is told to do with it",
  maxLength: 2000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A judgement opens with the act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A judgement then says why that act is worth an agent.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
