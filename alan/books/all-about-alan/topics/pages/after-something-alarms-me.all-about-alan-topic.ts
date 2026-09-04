import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const afterSomethingAlarmsMe = {
  id: "01a06559-9d65-7a49-a6f7-443bfca85dc0",
  pageTypeSlug: "all-about-alan-topic",
  slug: "after-something-alarms-me",
  title: "After Something Alarms Me",
  definition: "what happens to my safety in the days after something frightens me",
  parentSlugs: ["safety-bar"],
  settled:
    "It drops hard, comes most of the way back, and leaves about a week of being easily startled.",
  unsettled:
    "The week-long tail is approximate and its decay constant is uninstrumented. Readings every six to twelve hours after a known alarm would pin the half-life.\n\nApplied during or straight after, does a fast vagal lever make the alarm encode less fully and shorten the tail?",
} as const satisfies AllAboutAlanTopic
