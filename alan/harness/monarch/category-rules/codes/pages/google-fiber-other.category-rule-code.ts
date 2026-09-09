import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const googleFiberOther = {
  id: "01a0655b-fcd0-7015-82b0-ade5f9790629",
  pageTypeSlug: "category-rule-code",
  slug: "google-fiber-other",
  title: "Google fiber other",
  matches: [
    { key: "merchant", comparison: "is", values: ["google fiber"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
