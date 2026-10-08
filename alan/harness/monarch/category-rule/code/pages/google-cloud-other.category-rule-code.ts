import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const googleCloudOther = {
  id: "01a0655b-fcd0-7013-91dd-18109b323fb3",
  type: "page-type/category-rule-code",
  slug: "google-cloud-other",
  title: "Google cloud other",
  matches: [
    { key: "merchant", comparison: "is", values: ["google cloud"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
