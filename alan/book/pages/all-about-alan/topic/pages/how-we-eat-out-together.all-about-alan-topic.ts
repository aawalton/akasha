import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howWeEatOutTogether = {
  id: "01a0c59e-f12b-784a-a832-403c332375f3",
  type: "page-type/all-about-alan-topic",
  slug: "how-we-eat-out-together",
  title: "How We Eat Out Together",
  definition: "the sharing we do when we eat away from home, and when food gets ordered in",
  parents: ["all-about-alan-topic/how-i-eat"],
  related: [
    "all-about-alan-topic/living-with-jen",
    "all-about-alan-topic/what-i-keep-because-it-means-something",
  ],
  settled:
    "Eating out is mostly with Jen, and we split the food. Usually one main course between us, which portions it naturally, and usually a dessert or two as well, because she loves treats.\n\nCostco samples belong in the same column.\n\nTakeaway and delivery come in when everybody needs feeding and Jen has no capacity to cook. That one is gated on capacity rather than chosen.",
} as const satisfies AllAboutAlanTopic
