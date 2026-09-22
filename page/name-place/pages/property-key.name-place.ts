import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const propertyKey = {
  id: "01a04fed-2fbf-7545-aff5-168ae23e9052",
  type: "page-type/name-place",
  slug: "property-key",
  definition: "the key of one of a page's values",
  nameFormat: "name-format/lower-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is read in code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The property the key names is called by its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Lowering each capital and setting a dash before that capital gives the slug back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key and the slug are one name in two formats rather than two spellings.",
    },
  ],
} as const satisfies NamePlace
