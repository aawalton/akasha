import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const arcStructure = {
  id: "01a06577-f385-7d82-9322-ca4e27181d96",
  type: "page-type/file-property",
  slug: "arc-structure",
  propertySlug: "arc-structure",
  definition: "the arcs a story is planned to run through",
  extensions: ["md"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An arc structure is a document beside its design rather than a line in the design.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An arc structure names every arc the story is planned to run through.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
