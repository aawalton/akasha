import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buildInputTreeHash = {
  id: "01a0685d-b81f-7f70-8ae2-8933a7780ba3",
  type: "page-type/text-property",
  slug: "build-input-tree-hash",
  propertySlug: "build-input-tree-hash",
  definition: "the hash of the files a mobile cut was built from",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cut with no hash predates the basis cuts are judged by and is taken as owed.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:42:47.583Z",
  updatedAt: "2026-10-30T15:47:11.353Z",
} as const satisfies TextProperty
