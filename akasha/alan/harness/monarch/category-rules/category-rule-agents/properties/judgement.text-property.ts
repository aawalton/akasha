import type { TextProperty } from "@akasha/pages-system/text-property"

export type Judgement = string

export const judgement = {
  id: "01a0680c-3c00-7006-b482-7d1f5a8c3107",
  pageTypeSlug: "text-property",
  slug: "judgement",
  propertySlug: "judgement",
  definition: "what an agent catching a transaction is told to do with it",
  max: 2000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A judgement opens with the act, and what follows is why it is worth an agent.",
    },
  ],
} as const satisfies TextProperty
