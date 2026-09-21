import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const eatingWhatSheBringsMe = {
  id: "01a06559-9d65-7149-98a8-f7ad7ce54c3a",
  type: "page-type/all-about-alan-topic",
  slug: "eating-what-she-brings-me",
  title: "Eating What She Brings Me",
  definition:
    "eating her food is how her care lands, so a lot of what I eat has nothing to do with hunger",
  parents: ["all-about-alan-topic/how-i-eat", "all-about-alan-topic/living-with-jen"],
  related: [
    "all-about-alan-topic/what-makes-me-start-eating",
    "all-about-alan-topic/working-out-how-she-thinks",
    "all-about-alan-topic/what-my-love-is-built-out-of",
  ],
  settled:
    "Between a third and half of what I eat is eaten because she brought it. Feeding me is plausibly one of the main channels her love runs on.\n\nRefusing reads as refusing the bid, so the obligation binds through the ordinary middle of my capacity.\n\nI can decline only at the extremes: at level six and above, where I have the reserve to absorb her disappointment, or at minus one and below, where not wanting is a hard reading I am not allowed to push through.\n\nPrying the food apart from the care has been tried at least four times and was a disaster each time. The landing depends on not naming it.\n\nBringing her in openly as a collaborator on my eating is not affordable below level six either, so it is deferred.\n\nWhat works is ambient shared direction rather than any agreement. She knows I am trying to eat healthier and is moving that way herself, so what she brings trends healthier on its own.",
} as const satisfies AllAboutAlanTopic
