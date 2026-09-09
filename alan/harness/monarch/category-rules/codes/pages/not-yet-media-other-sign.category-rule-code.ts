import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const notYetMediaOtherSign = {
  id: "01a0655b-fcd0-702d-92f5-0bca45000569",
  pageTypeSlug: "category-rule-code",
  slug: "not-yet-media-other-sign",
  title: "Not yet media other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["not yet media"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
