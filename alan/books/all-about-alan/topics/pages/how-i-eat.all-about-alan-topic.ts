import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howIEat = {
  id: "01a06559-9d65-75a2-b6e8-06ea0d9867cd",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "how-i-eat",
  title: "How I Eat",
  definition: "food as fuel, and why that costs me nothing",
  parents: ["alan"],
  related: ["what-comes-with-it", "how-i-get-anything-done"],
  settled:
    "Enjoyment runs at about a tenth of other people's, so eating functionally is close to neutral for me.\n\nMy favourite flavours are hot and cold. Temperature and texture matter more to me than taste.\n\nAversion is conceptual rather than sensory, and an eat-healthier frame manufactures it out of nothing.\n\nNothing bores me, so a food leaves only by going wrong or by being forgotten.\n\nEvery shop, I buy one new thing to try, against the long contraction.",
} as const satisfies AllAboutAlanTopic
