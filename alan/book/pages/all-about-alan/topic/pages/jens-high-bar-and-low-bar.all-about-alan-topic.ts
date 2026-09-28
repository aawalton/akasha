import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const jensHighBarAndLowBar = {
  id: "01a0e987-5d1d-73d8-ab87-17a42ef09417",
  type: "page-type/all-about-alan-topic",
  slug: "jens-high-bar-and-low-bar",
  title: "Jen's High Bar And Low Bar",
  definition: "the gap between what Jen ideally expects of me and what she practically expects",
  parents: ["all-about-alan-topic/undefined-expectations"],
  related: ["all-about-alan-topic/living-with-jen"],
  settled:
    "Jen's ideal expectations are high and her practical ones are low, and I am never sure which I will be getting.\n\nShe always starts with the high bar and then negotiates down.\n\nFor the ten-day trip I was about to leave on at the end of September 2026, she had implied the low bar at some times and the high bar at others.",
} as const satisfies AllAboutAlanTopic
