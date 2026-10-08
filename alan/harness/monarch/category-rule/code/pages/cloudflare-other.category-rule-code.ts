import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const cloudflareOther = {
  id: "01a0655b-fcd0-7002-b222-f46ccbbe3452",
  type: "page-type/category-rule-code",
  slug: "cloudflare-other",
  title: "Cloudflare other",
  matches: [
    { key: "merchant", comparison: "is", values: ["cloudflare"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
