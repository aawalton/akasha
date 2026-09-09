import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theTwoNightsWeKeep = {
  id: "01a06559-9d65-7074-8111-4a6937445aee",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-two-nights-we-keep",
  title: "The Two Nights We Keep",
  definition: "two nights a week on the calendar, one for how she connects and one for how I do",
  parents: ["living-with-jen"],
  related: [
    "how-a-hard-talk-with-jen-gets-safer",
    "what-an-activity-costs-me",
    "working-out-how-she-thinks",
  ],
  settled:
    "They are calendar items, not set by how I am on the day, because unscheduled they do not happen.\n\nThe hard night clears things that stood for years, and the clearing holds because what changed is understanding, not a promise.\n\nThe cost is delayed: it lands the day after rather than during the night.\n\nI have noticed a pull in myself to cancel the hard one.\n\nBoth sit on top of a cost that lands almost every night anyway.",
} as const satisfies AllAboutAlanTopic
