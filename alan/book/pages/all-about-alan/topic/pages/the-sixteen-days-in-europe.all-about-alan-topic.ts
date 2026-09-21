import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theSixteenDaysInEurope = {
  id: "01a0c59f-3c75-7c59-b988-7ab257ea489a",
  type: "page-type/all-about-alan-topic",
  slug: "the-sixteen-days-in-europe",
  title: "The Sixteen Days In Europe",
  definition: "the trip alone with Jen, what it came to, and what I carried home from it",
  parents: ["all-about-alan-topic/living-with-jen"],
  related: [
    "all-about-alan-topic/the-two-nights-we-keep",
    "all-about-alan-topic/sharing-a-bed",
    "all-about-alan-topic/why-a-holiday-costs-me",
  ],
  settled:
    "Sixteen days in Europe, alone with Jen. I came out of it slightly positive on the trip overall, which I have not managed since our honeymoon.\n\nIt did not accumulate there. Thirteen or so days ran neutral, and then conceptual breakthroughs in the last few re-scored the whole thing.\n\nI brought two things home. Sleeping in the bedroom again as an experiment, and two date nights a week, one aimed at how she connects and one at how I do.\n\nA third came later, named as an insight rather than as something to run: relationships require sacrifice to exist.\n\nThe results came back without the context. I had what we decided and not what made it right, and the why only returned afterwards, on being asked. That is the ordinary shape of what I keep.",
} as const satisfies AllAboutAlanTopic
