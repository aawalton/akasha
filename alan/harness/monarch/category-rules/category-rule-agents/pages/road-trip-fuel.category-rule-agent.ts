import type { CategoryRuleAgent } from "../category-rule-agent.page-type.ts"

export const roadTripFuel = {
  id: "01a0655b-fcdc-7000-b2fd-46328aa7c667",
  pageTypeSlug: "category-rule-agent",
  slug: "road-trip-fuel",
  title: "Road trip fuel",
  matches: [{ key: "merchant", comparison: "is", values: ["chevron", "maverik"] }],
  judgement:
    "**Take a fill-up outside the Costco pump to whichever budget Jenny says the trip came out of.**\n\nNine rows in three years have landed in five categories, the large ones against a trip and the small ones against an errand. Four rows a year by hand costs less than a rule overruling her.",
} as const satisfies CategoryRuleAgent
