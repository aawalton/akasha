import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buildInputTreeHash = {
  id: "01a0685d-b81f-7f70-8ae2-8933a7780ba3",
  type: "page-type/text-property",
  slug: "build-input-tree-hash",
  propertySlug: "build-input-tree-hash",
  definition: "the hash of everything a build reads, which says whether a cut is owed",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cut with no hash predates the basis cuts are judged by and reads as owed.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
