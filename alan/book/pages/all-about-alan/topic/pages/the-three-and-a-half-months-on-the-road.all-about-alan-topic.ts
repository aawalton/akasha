import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theThreeAndAHalfMonthsOnTheRoad = {
  id: "01a0ca27-eff3-7844-9c22-54777a2863dc",
  type: "page-type/all-about-alan-topic",
  slug: "the-three-and-a-half-months-on-the-road",
  title: "The Three And A Half Months On The Road",
  definition: "the family road trip of autumn 1999, and what paid for it",
  parents: ["all-about-alan-topic/the-chapters-of-my-life"],
  related: [
    "all-about-alan-topic/the-middle-school-years",
    "all-about-alan-topic/the-punishments-i-could-not-see-coming",
  ],
  settled:
    "My dad was a children's book author, so he had the idea of a family trip paid for by doing school visits.\n\nIt ended up being three and a half months. We started in upstate New York, followed the turning of the leaves down to Florida, then came home.\n\nIt took the first semester of high school.",
} as const satisfies AllAboutAlanTopic
