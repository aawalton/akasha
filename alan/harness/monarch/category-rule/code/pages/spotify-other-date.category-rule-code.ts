import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const spotifyOtherDate = {
  id: "01a0655b-fcd1-700c-9a2b-8b63dce73aff",
  type: "page-type/category-rule-code",
  slug: "spotify-other-date",
  title: "Spotify other date",
  matches: [
    { key: "merchant", comparison: "is", values: ["spotify"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "date", comparison: "is-before", values: ["2025-08-08"] },
  ],
  createdAt: "2026-09-03T03:42:02.449Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
