import type { NumberProperty } from "../../number-property/number-property.page-type.ts"

export type NextSeq = number

export const nextSeq = {
  id: "01a05222-9730-75f4-b91e-43403b7dff9b",
  pageTypeSlug: "number-property",
  slug: "next-seq",
  propertySlug: "next-seq",
  definition: "the number the next page of this page type is given",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type stating this counts its pages, and states `seq` among its properties too; stating one without the other is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The count stands on the page type's own page, so what a type has counted is read where the type is read and moves under review like anything else.",
    },
    {
      invariantKind: "departure",
      statement:
        "It never falls, because a number that fell would be handed to a second page while the first still carries it.",
    },
    {
      invariantKind: "departure",
      statement: "It starts at 1, so the first page of a type is the first.",
    },
    {
      invariantKind: "departure",
      statement:
        "It rises in the commit that lands the page taking it, so no number stands as taken by nothing.",
    },
  ],
} as const satisfies NumberProperty
