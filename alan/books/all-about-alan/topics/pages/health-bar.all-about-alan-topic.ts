import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const healthBar = {
  id: "01a06559-9d65-7ad1-b413-f3d982ce26eb",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "health-bar",
  title: "Health Bar",
  definition: "the stress my body can carry",
  parents: ["resource-bars"],
  related: ["stress-capacity"],
} as const satisfies AllAboutAlanTopic
