import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const term = {
  id: "01a081e9-9784-7d46-ac3d-c0dd6d88cb38",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "term",
  definition: "one word or phrase, and what that word means here",
  pluralSlug: "terms",
  parts: ["text-property/spelling", "text-property/variants"],
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/spelling", required: true, many: false },
    { pageProperty: "text-property/variants", required: false, many: true, maxCount: null },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
