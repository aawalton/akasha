import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyABadStretchDrainsMeFaster = {
  id: "01a0c591-387a-7a2b-9709-b412c73d7655",
  type: "page-type/all-about-alan-topic",
  slug: "why-a-bad-stretch-drains-me-faster",
  title: "Why A Bad Stretch Drains Me Faster",
  definition: "why the same stressor empties me quicker once my capacity is already low",
  parents: ["all-about-alan-topic/health-bar"],
  related: ["all-about-alan-topic/safety-level", "all-about-alan-topic/what-an-activity-costs-me"],
  settled:
    "Lower capacity lowers my safety level, since safety is roughly capacity averaged over time.\n\nLower safety raises the multiplier on the same input. High up the scale a level is about twice the cost.\n\nA bigger multiplier on the same stressor makes my stress climb faster.\n\nWhat changes is the rate, not the reading. The same thing does not read higher in the moment. My stress simply gets there sooner and goes further.\n\nThat distinction carries weight. Rate is what compounded the slide of about twenty per cent a year, and rate is what turns around as safety climbs and the multiplier falls.\n\nSo capacity and the stress I am at right now are neither independent of each other nor simply added together. Capacity reaches the moment by way of safety.",
} as const satisfies AllAboutAlanTopic
