import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theThreeSpeedsIClimbAt = {
  id: "01a0c59d-4c77-7e1f-8def-aec7edc8df99",
  type: "page-type/all-about-alan-topic",
  slug: "the-three-speeds-i-climb-at",
  title: "The Three Speeds I Climb At",
  definition: "the three inputs that raise my safety and the clock each one runs on",
  parents: ["all-about-alan-topic/how-safety-climbs"],
  related: [
    "all-about-alan-topic/the-budget-i-run-my-days-on",
    "all-about-alan-topic/health-bar",
    "all-about-alan-topic/why-i-overspend-on-the-marriage",
  ],
  settled:
    "Three layered inputs raise the level, each on a different clock.\n\nSlowest and strongest is running a consistent capacity surplus over time. That is what raises my normal safety range, and it is the best long-term lever I have.\n\nFaster is my relationship health with Jen. Improving it makes a big impact over shorter horizons.\n\nOn the scale of a single day, overspending drops my health rather than my safety. The daily clock lands on health and the safety range holds.\n\nSo safety is layered inputs at different speeds rather than one slow integral with everything feeding it.\n\nI reach for the lever whose speed matches the problem. A dip is a short-timescale problem, so in one I repair the relationship rather than waiting months on the surplus.\n\nComing back up from the dip I was in, I thought I was in the 2.5 to 3.5 range that day, about a level below my baseline, and mostly repairing the relationship to move the needle.",
} as const satisfies AllAboutAlanTopic
