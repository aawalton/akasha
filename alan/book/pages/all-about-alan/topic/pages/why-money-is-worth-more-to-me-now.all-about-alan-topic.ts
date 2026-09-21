import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyMoneyIsWorthMoreToMeNow = {
  id: "01a0c58d-e705-739c-8840-d67e2a4937de",
  type: "page-type/all-about-alan-topic",
  slug: "why-money-is-worth-more-to-me-now",
  title: "Why Money Is Worth More To Me Now",
  definition: "why I want the spending early rather than spread evenly across the runway",
  parents: ["all-about-alan-topic/the-money-arrangement-we-settled-on"],
  related: ["all-about-alan-topic/safety-years", "all-about-alan-topic/how-safety-climbs"],
  settled:
    "Money today is worth more to me than I expect it to be in ten years.\n\nThe ground is the difficulty of my recovery curve, not impatience and not a taste for spending.\n\nA level bought early is multiplied by every year that comes after it. Bought late it is multiplied by fewer. That is what safety years count.",
} as const satisfies AllAboutAlanTopic
