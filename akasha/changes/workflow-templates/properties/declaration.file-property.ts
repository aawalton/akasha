import type { FileProperty } from "@akasha/pages-system/file-property"

export type Declaration = "ts"

export const declaration = {
  id: "01a06810-7000-7002-a738-4f6c2b1d7103",
  pageTypeSlug: "file-property",
  slug: "declaration",
  propertySlug: "declaration",
  definition: "the steps a workflow runs, written out",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A declaration is a page property held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration states the steps, and the page states what they are for.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration is read for its value rather than run.",
    },
  ],
} as const satisfies FileProperty
