import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const schema = {
  id: "01a0a224-fc4d-77a7-acc9-5ab9b742fdeb",
  type: "file-property",
  slug: "schema",
  propertySlug: "schema",
  definition: "everything it takes to work with a page type, one line to a property",
  extensions: ["jsonl"],
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type holds what it declares and what every page type above it declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A property a page type declares again is held once, as that page type declares it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line holds the property worked out whole, so a reader reads no second page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A line holds everything the declaration says and everything the property's own page says.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line says which page type above declared the property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The lines are sorted, so a property that changes moves one line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type declaring no property has a file with no line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every page type's file is written again when any page type or page property changes.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
