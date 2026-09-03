import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const spotifyOtherDate = {
  id: "01a0655b-fcd1-700c-9a2b-8b63dce73aff",
  pageTypeSlug: "category-rule-code",
  slug: "spotify-other-date",
  title: "Spotify other date",
  matches: [
    { key: "merchant", comparison: "is", values: ["spotify"] },
    { key: "sign", comparison: "is", values: ["negative"] },
    { key: "date", comparison: "is-before", values: ["2025-08-08"] },
  ],
} as const satisfies CategoryRuleCode
