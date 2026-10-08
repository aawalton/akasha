import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const crunchyrollOtherDate = {
  id: "01a0655b-fcd0-7008-9360-1784a7e7e444",
  type: "page-type/category-rule-code",
  slug: "crunchyroll-other-date",
  title: "Crunchyroll other date",
  matches: [
    { key: "merchant", comparison: "is", values: ["crunchyroll"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "date", comparison: "is-before", values: ["2026-08-08"] },
  ],
  createdAt: "2026-09-03T03:42:02.448Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
