import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const standardTransferOtherAccount = {
  id: "01a0655b-fcda-7002-99e3-28713b21e7ce",
  type: "page-type/category-rule-code",
  slug: "standard-transfer-other-account",
  title: "Standard transfer other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["standard transfer"] },
    { key: "account", comparison: "is-not", values: ["Personal Profile"] },
  ],
  createdAt: "2026-09-03T03:42:02.458Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
