import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTwoNightsWeKeep = {
  id: "01a06559-9d65-7074-8111-4a6937445aee",
  type: "page-type/all-about-alan-topic",
  slug: "the-two-nights-we-keep",
  title: "The Two Nights We Keep",
  definition: "two nights a week on the calendar, one for how she connects and one for how I do",
  parents: ["all-about-alan-topic/living-with-jen"],
  related: [
    "all-about-alan-topic/how-a-hard-talk-with-jen-gets-safer",
    "all-about-alan-topic/what-an-activity-costs-me",
    "all-about-alan-topic/working-out-how-she-thinks",
  ],
  settled:
    "They are calendar items, not set by how I am on the day, because unscheduled they do not happen. Hers is Tuesday and mine is Friday, a three-day gap and a four-day one, and I recover well in between. They move where the week needs them to.\n\nTwo different kinds of work. Mine is the hard night that ends in a shared change of model. Hers is the night that goes beautifully, and I do not yet reliably provide it.\n\nThe hard night clears things that stood for years, and the clearing holds because what changed is understanding, not a promise. It is a lever on my base safety, so the running cost comes down over time.\n\nI have noticed a pull in myself to cancel the hard one.\n\nBoth sit on top of a cost that lands almost every night anyway. Which way a night goes is Jen's to choose, connection or sleep, and that is the largest single variable in the standing cost.\n\nShe knows what the nights cost me. They cost her too and benefit her more, so she is net positive and still notices the cost.",
} as const satisfies AllAboutAlanTopic
