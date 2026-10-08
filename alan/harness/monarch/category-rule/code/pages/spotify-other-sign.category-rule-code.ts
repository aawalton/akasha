import type { CategoryRuleCode } from "akasha/alan/harness/monarch/category-rule/code/category-rule-code.page-type.types.ts"

export const spotifyOtherSign = {
  id: "01a0655b-fcda-7000-ac9b-9f92a57f99c1",
  type: "page-type/category-rule-code",
  slug: "spotify-other-sign",
  title: "Spotify other sign",
  matches: [
    { key: "merchant", comparison: "is", values: ["spotify"] },
    { key: "sign", comparison: "is-not", values: ["negative"] },
  ],
  createdAt: "2026-09-03T03:42:02.458Z",
  updatedAt: "2026-09-15T16:07:35.000Z",
} as const satisfies CategoryRuleCode
