import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howHardAThingIs = {
  id: "01a06559-9d65-7c0b-aee2-9f2d6f58096c",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "how-hard-a-thing-is",
  title: "How Hard A Thing Is",
  definition: "how demanding an activity is, as a rung rather than a feeling",
  parents: ["what-an-activity-costs-me"],
  settled:
    "Its rung is what my safety level gets compared against.\n\nMy projects have a base of rung two, and rebuilding the foundational layers under them raises the difficulty above that base.",
} as const satisfies AllAboutAlanTopic
