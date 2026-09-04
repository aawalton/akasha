import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const spotifyOtherSign = {
  id: "01a0655b-fcda-7000-ac9b-9f92a57f99c1",
  pageTypeSlug: "category-rule-code",
  slug: "spotify-other-sign",
  title: "Spotify other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["spotify"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
} as const satisfies CategoryRuleCode
