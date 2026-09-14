import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const shape = {
  id: "01a0a224-fc4d-76d4-8d8e-0b56c5ae19fd",
  type: "file-property",
  slug: "shape",
  propertySlug: "shape",
  definition: "what a page property is, as every page type carrying that property reads it",
  extensions: ["jsonl"],
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape says what the property's own page says and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "A shape is keyed by the page type the property is and then that property's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A shape says whether the property keeps its values in the order they sort in.",
    },
    {
      invariantKind: "departure",
      statement: "A property saying nothing about that order says false here rather than nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The file has one line.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
