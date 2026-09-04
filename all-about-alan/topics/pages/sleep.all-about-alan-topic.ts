import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const sleep = {
  id: "01a06559-9d65-7d9a-ad90-89259d991819",
  pageTypeSlug: "all-about-alan-topic",
  slug: "sleep",
  title: "Sleep",
  definition: "how I sleep, and what it does for me",
  parentSlugs: ["resources"],
  settled:
    "Nine or ten hours, and I almost always wake without an alarm.\n\nIt is the nearest thing to a cure-all I have found.",
  unsettled:
    "Whether nine or ten hours is what I need or what I currently owe is unknown. If it is a debt it should come down as I recover.\n\nWhether how often I surface between cycles tracks anything, how much I have left or how stressed I am, is unprobed. I treat it as harmless.\n\nWhether the nights that go hard ever cross into a disorder, or stay variation driven by my state, is unclassified.",
} as const satisfies AllAboutAlanTopic
