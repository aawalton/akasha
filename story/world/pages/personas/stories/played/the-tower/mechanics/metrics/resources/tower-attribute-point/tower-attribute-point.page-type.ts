import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerAttributePoint = {
  id: "01a0ca2a-d87e-7dc2-9e16-74e77554a0ba",
  type: "page-type/page-type",
  slug: "tower-attribute-point",
  definition: "a point a character in the Tower has left to raise an attribute with",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
