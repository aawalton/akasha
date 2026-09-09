import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const afterSomethingAlarmsMe = {
  id: "01a06559-9d65-7a49-a6f7-443bfca85dc0",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "after-something-alarms-me",
  title: "After Something Alarms Me",
  definition: "what happens to my safety in the days after something frightens me",
  parents: ["safety-bar"],
  settled:
    "It drops hard, comes most of the way back, and leaves about a week of being easily startled.",
} as const satisfies AllAboutAlanTopic
