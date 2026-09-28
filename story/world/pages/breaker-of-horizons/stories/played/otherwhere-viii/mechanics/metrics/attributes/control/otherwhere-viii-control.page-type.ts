import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiiControl = {
  id: "01a0ea44-5ece-7318-9979-c48e480ff42b",
  type: "page-type/page-type",
  slug: "otherwhere-viii-control",
  definition: "how finely a character in Otherwhere VIII works the Art",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
