import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theThingsIStayWithForYears = {
  id: "01a0c5a7-d70a-783c-a268-12f3f5dd54b5",
  type: "page-type/all-about-alan-topic",
  slug: "the-things-i-stay-with-for-years",
  title: "The Things I Stay With For Years",
  definition: "the deep interests that run for years, and the shape that lets them",
  parents: ["all-about-alan-topic/what-pulls-me-into-doing-something"],
  related: [
    "all-about-alan-topic/small-bites-of-many-things",
    "all-about-alan-topic/when-something-is-fun",
    "all-about-alan-topic/what-repetition-encodes",
  ],
  settled:
    "My deep interests run for years rather than months. Autism wants the same thing every day and ADHD wants something different every day. Those look incompatible until the resolution: same context, novel content.\n\nMy favourite books are the longest ones. Top of that list is The Wandering Inn, at about sixteen million words.\n\nI play almost exclusively one game, The Elder Scrolls Online, and I have been at it more than ten years and more than twelve thousand hours.\n\nBoth work for one reason. The frame never changes and what happens inside it always does.\n\nWith no emotional memory, how I relate to a thing, a place or a person runs on the direct response of my nervous system to it. That response is slow to form, which pushes me further into whatever I have already done most.",
} as const satisfies AllAboutAlanTopic
