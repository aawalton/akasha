import type { TextProperty } from "@akasha/pages-system/text-property"

export type DispatchedAs = string

export const dispatchedAs = {
  id: "01a06861-f664-7070-953a-006378f69982",
  pageTypeSlug: "text-property",
  slug: "dispatched-as",
  propertySlug: "dispatched-as",
  definition: "the name a seat hands a harness to reach one kind",
  max: 40,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name a seat dispatches by is spelled as the harness spells it.",
    },
    {
      invariantKind: "departure",
      statement: "A kind's title is never what a seat dispatches by.",
    },
  ],
} as const satisfies TextProperty
