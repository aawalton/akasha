import type { TextProperty } from "@akasha/pages/text-property"

export type BuildInputTreeHash = string

export const buildInputTreeHash = {
  id: "01a0685d-b81f-7f70-8ae2-8933a7780ba3",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "build-input-tree-hash",
  propertySlug: "build-input-tree-hash",
  definition: "the hash of everything a build reads, which a cut is judged owed against",
  maxLength: 64,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cut with no hash predates the basis cuts are judged by and reads as owed.",
    },
  ],
} as const satisfies TextProperty
