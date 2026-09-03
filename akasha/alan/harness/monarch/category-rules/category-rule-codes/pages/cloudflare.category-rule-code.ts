import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const cloudflare = {
  id: "01a0655b-fcd0-7003-a7a0-b184fef44883",
  pageTypeSlug: "category-rule-code",
  slug: "cloudflare",
  title: "Cloudflare",
  matches: [
    { key: "merchant", comparison: "is", values: ["cloudflare"] },
    { key: "sign", comparison: "is", values: ["negative"] },
  ],
  categorySlug: "alans-spending",
} as const satisfies CategoryRuleCode
