import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const sleep = {
  id: "01a06559-9d65-7d9a-ad90-89259d991819",
  pageTypeSlug: "all-about-alan-topic",
  slug: "sleep",
  title: "Sleep",
  definition: "how I sleep, and what it does for me",
  parentSlugs: ["resources"],
  settled:
    "Seven hours most days at the moment, where I want nine or ten.\n\nI almost always wake without an alarm.\n\nIt is the nearest thing to a cure-all I have found.",
} as const satisfies AllAboutAlanTopic
