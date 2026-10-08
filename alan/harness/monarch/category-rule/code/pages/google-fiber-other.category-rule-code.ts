import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const googleFiberOther = {
  id: "01a0655b-fcd0-7015-82b0-ade5f9790629",
  type: "page-type/category-rule-code",
  slug: "google-fiber-other",
  title: "Google fiber other",
  matches: [
    { key: "merchant", comparison: "is", values: ["google fiber"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
