import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyAMealDoesSoLittleForMe = {
  id: "01a0c59b-308a-74b4-9319-991d4459d0b2",
  type: "page-type/all-about-alan-topic",
  slug: "why-a-meal-does-so-little-for-me",
  title: "Why A Meal Does So Little For Me",
  definition: "the missing memory and the missing picture that leave food nearly flat",
  parents: ["all-about-alan-topic/how-i-eat"],
  related: [
    "all-about-alan-topic/what-i-cannot-play-forward",
    "all-about-alan-topic/the-three-seconds-i-am",
  ],
  settled:
    "I cannot call back what a meal was like, so there is nothing to reminisce over. I cannot picture one ahead either, so there is nothing to look forward to.\n\nWhat is left is the enjoyment in the moment, and that only arrives when I am doing well, and even then it is muted.\n\nSo the food-as-pleasure engine that drives most overeating is barely running in me. A plain, repetitive, functional diet is not something I am enduring.",
} as const satisfies AllAboutAlanTopic
