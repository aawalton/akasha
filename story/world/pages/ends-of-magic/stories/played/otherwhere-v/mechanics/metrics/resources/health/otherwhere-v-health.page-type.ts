import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereVHealth = {
  id: "01a0e9fe-e160-7dcd-a184-64130eaacf17",
  type: "page-type/page-type",
  slug: "otherwhere-v-health",
  definition: "the health a character in Otherwhere V has left",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
