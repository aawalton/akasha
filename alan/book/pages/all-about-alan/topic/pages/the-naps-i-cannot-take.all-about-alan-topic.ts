import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theNapsICannotTake = {
  id: "01a0c5a1-c899-71f4-ad68-efdb798a1208",
  type: "page-type/all-about-alan-topic",
  slug: "the-naps-i-cannot-take",
  title: "The Naps I Cannot Take",
  definition: "daytime sleep I want and the medication that keeps it out of reach",
  parents: ["all-about-alan-topic/sleep"],
  related: ["all-about-alan-topic/what-shortens-my-nights"],
  settled:
    "I love a nap when I can manage one.\n\nVyvanse blocks daytime sleep on most days.\n\nSo one drug squeezes both ends: it pushes my falling asleep later at night and takes the nap out of the day.",
} as const satisfies AllAboutAlanTopic
