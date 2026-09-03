import type { CategoryRuleCode } from "../category-rule-code.page-type.ts"

export const jaredJessopConstruction = {
  id: "01a0655b-fcd0-701c-a49a-24214fd2b76c",
  pageTypeSlug: "category-rule-code",
  slug: "jared-jessop-construction",
  title: "Jared jessop construction",
  matches: [{ key: "merchant", comparison: "is", values: ["jared jessop"] }],
  categorySlug: "house",
} as const satisfies CategoryRuleCode
