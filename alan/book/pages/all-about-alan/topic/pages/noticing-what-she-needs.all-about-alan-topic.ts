import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const noticingWhatSheNeeds = {
  id: "01a06559-9d65-77da-96b6-383288fae230",
  type: "page-type/all-about-alan-topic",
  slug: "noticing-what-she-needs",
  title: "Noticing What She Needs",
  definition: "the doing works, and what fails is seeing that something is wanted",
  parents: ["all-about-alan-topic/working-out-what-love-is"],
  settled:
    "Asking instead of guessing is the one bridge I have built, and it does not run consistently.\n\nRecall does not fire unprompted, so responding depends on effort rather than on a default.",
} as const satisfies AllAboutAlanTopic
