import type { TextProperty } from "@akasha/pages/text-property"

export type Directs = string

export const directs = {
  id: "01a0680a-1a00-7018-9b56-4f7a3d8c1118",
  pageTypeSlug: "text-property",
  slug: "directs",
  propertySlug: "directs",
  definition: "what an agent settling a transaction is told to weigh",
  maxLength: 1000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A direction says the things to weigh.",
    },
    {
      invariantKind: "departure",
      statement: "A direction never says the decision to make.",
    },
  ],
} as const satisfies TextProperty
