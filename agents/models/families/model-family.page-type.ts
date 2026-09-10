import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const modelFamily = {
  id: "01a0535c-f2cf-7d57-8803-2dbb722ac8bc",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "model-family",
  definition: "a family of models",
  pluralSlug: "model-families",
  parts: [
    "model-family/fable",
    "model-family/haiku",
    "model-family/opus",
    "model-family/sonnet",
    "text-property/model-name",
  ],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "text-property/model-name", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
