import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const standardTransferOtherAccount = {
  id: "01a0655b-fcda-7002-99e3-28713b21e7ce",
  pageTypeSlug: "category-rule-code",
  slug: "standard-transfer-other-account",
  title: "Standard transfer other account",
  matches: [
    { key: "merchant", comparison: "is", values: ["standard transfer"] },
    { key: "account", comparison: "is-not", values: ["Personal Profile"] },
  ],
} as const satisfies CategoryRuleCode
