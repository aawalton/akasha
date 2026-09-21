import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const namesAPropertyKey = {
  id: "01a0c560-ea1e-73a7-adc7-f3690fc69293",
  type: "page-type/boolean-property",
  slug: "names-a-property-key",
  propertySlug: "names-a-property-key",
  definition: "whether a value under this property names a key a page type declares",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property saying nothing here names no key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property saying true holds the key a declaration states rather than a slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property holding many values names a key in each of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field of a record property saying true names a key in each record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type the key is declared by is the page type the page lists.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
