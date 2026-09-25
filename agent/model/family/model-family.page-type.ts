import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const modelFamily = {
  id: "01a0535c-f2cf-7d57-8803-2dbb722ac8bc",
  type: "page-type/page-type",
  slug: "model-family",
  definition: "a set of model versions under a name",
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
  schema: "jsonl",
} as const satisfies PageType
