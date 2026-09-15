import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const shapes = {
  id: "01a0a224-fc4d-76d4-8d8e-0b56c5ae19fd",
  type: "file-property",
  slug: "shapes",
  propertySlug: "shapes",
  definition: "what every page property of a page type is, one line to a property",
  extensions: ["jsonl"],
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type holds one line for every page property of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A line says what the page property's own page says and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "A line says whether the property keeps its values in the order they sort in.",
    },
    {
      invariantKind: "departure",
      statement: "A property saying nothing about that order says false here rather than nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The lines are sorted by slug, so a property that changes moves one line.",
    },
    {
      invariantKind: "departure",
      statement: "Every page type extending `page-property` states this property.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no page property is of holds a file with no line.",
    },
    {
      invariantKind: "departure",
      statement: "Every page type's file is written again when any page property changes.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
