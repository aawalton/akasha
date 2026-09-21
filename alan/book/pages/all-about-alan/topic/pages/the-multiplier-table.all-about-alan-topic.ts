import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theMultiplierTable = {
  id: "01a0c5a6-510b-71fa-a08a-4fdc465e0f63",
  type: "page-type/all-about-alan-topic",
  slug: "the-multiplier-table",
  title: "The Multiplier Table",
  definition: "what an hour costs me at each gap between my safety level and a difficulty",
  parents: ["all-about-alan-topic/what-an-activity-costs-me"],
  related: [
    "all-about-alan-topic/the-rating-my-budget-rests-on",
    "all-about-alan-topic/how-hard-a-thing-counts-as",
  ],
  settled:
    "The anchor is that one hour at a multiplier of one costs me one stress-capacity hour.\n\nWhere my safety matches the difficulty the multiplier is one. Half a step above it is a half. A full step above it is nothing at all.\n\nHalf a step below it is one and a half. A full step below is two. One and a half below is three.\n\nEach further full level of difference is generally a doubling.\n\nRead in order from above my level down through it, the practical sequence with rounding runs nought, a half, one, one and a half, two, three, four.",
} as const satisfies AllAboutAlanTopic
