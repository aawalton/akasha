import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const carried = {
  id: "01a0a224-fc4d-77a7-acc9-5ab9b742fdeb",
  type: "file-property",
  slug: "carried",
  propertySlug: "carried",
  definition: "what a page type carries, one line to a property, each worked out whole",
  extensions: ["jsonl"],
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type carries what it declares and what every page type above it declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property a page type declares again is carried once, as that page type declares it.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the property worked out whole, so a reader reads no second page.",
    },
    {
      invariantKind: "departure",
      statement: "A line says which page type above declared the property.",
    },
    {
      invariantKind: "departure",
      statement: "The lines are sorted, so a property that changes moves one line.",
    },
    {
      invariantKind: "departure",
      statement: "A page type carrying no property has a file with no line.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
