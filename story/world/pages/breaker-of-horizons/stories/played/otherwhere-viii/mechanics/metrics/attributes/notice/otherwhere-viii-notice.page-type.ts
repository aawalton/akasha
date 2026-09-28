import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiiNotice = {
  id: "01a0ea46-78e1-7bc9-bfca-905546406009",
  type: "page-type/page-type",
  slug: "otherwhere-viii-notice",
  definition: "how much attention a character in Otherwhere VIII has drawn",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
