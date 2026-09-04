import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const standardTransferOtherSign = {
  id: "01a0655b-fcda-7003-97a1-09e9502c4e26",
  pageTypeSlug: "category-rule-code",
  slug: "standard-transfer-other-sign",
  title: "Standard transfer other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["standard transfer"] },
    { key: "account", comparison: "is", values: ["Personal Profile"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
