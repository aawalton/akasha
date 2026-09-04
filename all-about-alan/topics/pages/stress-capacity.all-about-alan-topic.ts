import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const stressCapacity = {
  id: "01a06559-9d65-78ec-ba0b-8372ba60ca4d",
  pageTypeSlug: "all-about-alan-topic",
  slug: "stress-capacity",
  title: "Stress Capacity",
  definition: "how much my body has left to handle what comes",
  parentSlugs: ["safety-stack"],
  relatedSlugs: ["health-bar"],
  unsettled:
    "Repeated exposure is meant to lower my setpoint over weeks, separately from what each exposure does on the day, and that slower recalibration has no place of its own.\n\nThe tiers stop before the top. What tier six and anything above it would be is unlabelled, so the top of the instrument is undefined while the bottom is worked.",
} as const satisfies AllAboutAlanTopic
