import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const oneOf = {
  id: "01a0954e-097d-7b5d-8207-3b3e29c78819",
  type: "relation-property",
  slug: "one-of",
  propertySlug: "one-of",
  definition: "an argument that answers for this one, where a call says at least one of them",
  targetPageType: "page-type/argument",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call saying none of the arguments in a group is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One entry states a group, and the others need no matching statement.",
    },
    {
      invariantKind: "departure",
      statement: "Entries naming each other are one group rather than several pairs.",
    },
    {
      invariantKind: "departure",
      statement: "One refusal names every argument in a group, however many entries state it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which arguments answer for each other belongs to the command rather than to the argument.",
    },
    {
      invariantKind: "departure",
      statement: "This narrows a call rather than a property's value, so it is no one-of property.",
    },
    {
      invariantKind: "gap",
      statement:
        "A call saying exactly one of a group states this beside `not-with`, and nothing joins the two.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
