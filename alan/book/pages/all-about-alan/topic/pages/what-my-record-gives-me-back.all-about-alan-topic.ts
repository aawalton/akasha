import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatMyRecordGivesMeBack = {
  id: "01a04625-d80e-77ab-8ff5-738b70a03458",
  type: "all-about-alan-topic",
  slug: "what-my-record-gives-me-back",
  title: "What My Record Gives Me Back",
  definition: "what reading my own record returns to me, and what it cannot",
  parents: ["all-about-alan-topic/what-i-cannot-play-forward"],
  related: [
    "all-about-alan-topic/what-the-book-of-me-is-for",
    "all-about-alan-topic/how-often-i-start-over",
  ],
  settled:
    "I have no experiential memory or imagination at all.\n\nI cannot remember the specifics of each revolution, except the ones that are actively dissonant because they are not done yet.\n\nI cannot get the memory back from reading my record.\n\nI can get back the fact of what I did, which can be nice.",
} as const satisfies AllAboutAlanTopic
