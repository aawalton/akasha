import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const amazonStoreCardOtherSign = {
  id: "01a0655b-fccf-7003-8065-370d746d4e19",
  type: "page-type/category-rule-code",
  slug: "amazon-store-card-other-sign",
  title: "Amazon store card other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["amazon store card"] },
    { key: "account", comparison: "is", values: ["6952"] },
    { key: "sign", comparison: "is-not", values: ["positive"] },
  ],
  createdAt: "2026-09-03T03:42:02.447Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
