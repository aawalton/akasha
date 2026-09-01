import type { TextProperty } from "../../text-property/text-property.page-type.ts"

export type DefaultValue = string

export const defaultValue = {
  id: "01a05a49-22f2-722f-8e3e-acd6d81b5c28",
  pageTypeSlug: "text-property",
  slug: "default-value",
  propertySlug: "default",
  definition: "the value a writer states for a property when it is told none",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A default is what a writer states when it is told nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A page carries no value it does not state.",
    },
    {
      invariantKind: "departure",
      statement: "A default does not make a required property optional.",
    },
    {
      invariantKind: "departure",
      statement: "A default stands on the declaration rather than on the property.",
    },
    {
      invariantKind: "departure",
      statement: "One property takes a different default under each page type declaring it.",
    },
    {
      invariantKind: "stopgap",
      statement: "A default is written as text whatever kind the property it stands for holds.",
    },
    {
      invariantKind: "gap",
      statement: "A default holds the kind its property holds.",
    },
  ],
} as const satisfies TextProperty
