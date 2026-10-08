import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const standardTransferOtherSign = {
  id: "01a0655b-fcda-7003-97a1-09e9502c4e26",
  type: "page-type/category-rule-code",
  slug: "standard-transfer-other-sign",
  title: "Standard transfer other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["standard transfer"] },
    { key: "account", comparison: "is", values: ["Personal Profile"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.458Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
