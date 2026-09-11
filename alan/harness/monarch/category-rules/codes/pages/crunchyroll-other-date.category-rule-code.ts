import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rules/codes/category-rule-code.page-type.types.ts"

export const crunchyrollOtherDate = {
  id: "01a0655b-fcd0-7008-9360-1784a7e7e444",
  type: "category-rule-code",
  slug: "crunchyroll-other-date",
  title: "Crunchyroll other date",
  matches: [
    { key: "merchant", comparison: "is", values: ["crunchyroll"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "date", comparison: "is-before", values: ["2026-08-08"] },
  ],
} as const satisfies CategoryRuleCode
