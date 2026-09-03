import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const googleCloudOther = {
  id: "01a0655b-fcd0-7013-91dd-18109b323fb3",
  pageTypeSlug: "category-rule-code",
  slug: "google-cloud-other",
  title: "Google cloud other",
  matches: [
    { key: "merchant", comparison: "is", values: ["google cloud"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
