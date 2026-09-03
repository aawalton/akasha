import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const crunchyrollOtherSign = {
  id: "01a0655b-fcd0-7009-9da9-88d8ecb19b35",
  pageTypeSlug: "category-rule-code",
  slug: "crunchyroll-other-sign",
  title: "Crunchyroll other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["crunchyroll"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
