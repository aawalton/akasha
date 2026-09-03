import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const healthBar = {
  id: "01a06559-9d65-7ad1-b413-f3d982ce26eb",
  pageTypeSlug: "all-about-alan-topic",
  slug: "health-bar",
  title: "Health Bar",
  definition: "the stress my body can carry",
  parentSlugs: ["resource-bars"],
  relatedSlugs: ["stress-capacity"],
  unsettled:
    "Stress level and stress capacity are treated as one bar but run on different time scales. They need separating properly.\n\nThe serious physical symptoms of the load are cited and never listed, and which of them trace to undischarged feeling rather than elsewhere is unsorted.",
} as const satisfies AllAboutAlanTopic
