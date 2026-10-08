import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const unstatedOtherSign = {
  id: "01a0655b-fcdb-7001-b4ad-ed33e8ad93ee",
  type: "page-type/category-rule-code",
  slug: "unstated-other-sign",
  title: "Unstated other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["unstated"] },
    { key: "account", comparison: "is", values: ["6952"] },
    { key: "sign", comparison: "is-not", values: ["positive"] },
  ],
  createdAt: "2026-09-03T03:42:02.459Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
