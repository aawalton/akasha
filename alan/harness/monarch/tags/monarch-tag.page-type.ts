import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const monarchTag = {
  id: "01a0680a-1a00-700f-a758-9b2c6e3f110f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "monarch-tag",
  definition: "a label applied to a transaction",
  pluralSlug: "monarch-tags",
  extends: ["page-type/monarch-record"],
  parts: ["number-property/tag-place", "text-property/tag-colour"],
  properties: [
    { pageProperty: "text-property/tag-colour", required: true, many: false },
    { pageProperty: "number-property/tag-place", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tag is made in Monarch by hand.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here creates a tag.",
    },
  ],
  types: "ts",
} as const satisfies PageType
