import type { TextProperty } from "@akasha/pages-system/text-property"

export type BuildInputTreeHash = string

export const buildInputTreeHash = {
  id: "01a0685d-b81f-7f70-8ae2-8933a7780ba3",
  pageTypeSlug: "text-property",
  slug: "build-input-tree-hash",
  propertySlug: "build-input-tree-hash",
  definition: "the hash of everything a build reads, which a cut is judged owed against",
  max: 64,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cut carrying none predates the basis cuts are judged by and reads as owed.",
    },
  ],
} as const satisfies TextProperty
