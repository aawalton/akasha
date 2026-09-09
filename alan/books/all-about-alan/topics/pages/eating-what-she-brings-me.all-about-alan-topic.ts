import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const eatingWhatSheBringsMe = {
  id: "01a06559-9d65-7149-98a8-f7ad7ce54c3a",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "eating-what-she-brings-me",
  title: "Eating What She Brings Me",
  definition:
    "eating her food is how her care lands, so a lot of what I eat has nothing to do with hunger",
  parents: ["how-i-eat", "living-with-jen"],
  related: [
    "what-makes-me-start-eating",
    "working-out-how-she-thinks",
    "what-my-love-is-built-out-of",
  ],
  settled:
    "Between a third and half of what I eat is eaten because she brought it.\n\nRefusing reads as refusing the bid, so the obligation binds through the ordinary middle of my capacity.\n\nI can decline only at the extremes: with reserve to absorb her disappointment, or too depleted to push through.\n\nPrying the food apart from the care has been tried and failed each time; the landing depends on not naming it.\n\nWhat works is ambient shared direction rather than any agreement.",
} as const satisfies AllAboutAlanTopic
