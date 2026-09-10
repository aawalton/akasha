import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Judgement = string

export const judgement = {
  id: "01a0680c-3c00-7006-b482-7d1f5a8c3107",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "judgement",
  propertySlug: "judgement",
  definition: "what an agent catching a transaction is told to do with it",
  maxLength: 2000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A judgement opens with the act.",
    },
    {
      invariantKind: "departure",
      statement: "A judgement then says why that act is worth an agent.",
    },
  ],
} as const satisfies TextProperty
