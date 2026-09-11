import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const cloudflareOther = {
  id: "01a0655b-fcd0-7002-b222-f46ccbbe3452",
  type: "category-rule-code",
  slug: "cloudflare-other",
  title: "Cloudflare other",
  matches: [
    { key: "merchant", comparison: "is", values: ["cloudflare"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
