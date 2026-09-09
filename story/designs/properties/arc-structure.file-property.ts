import type { FileProperty } from "@akasha/pages/file-property"

export type ArcStructure = "md"

export const arcStructure = {
  id: "01a06577-f385-7d82-9322-ca4e27181d96",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "arc-structure",
  propertySlug: "arc-structure",
  definition: "the arcs a story is planned to run through",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An arc structure is a document beside its design rather than a line in the design.",
    },
    {
      invariantKind: "departure",
      statement: "An arc structure names every arc the story is planned to run through.",
    },
  ],
} as const satisfies FileProperty
