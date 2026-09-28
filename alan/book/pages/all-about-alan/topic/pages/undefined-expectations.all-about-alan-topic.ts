import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const undefinedExpectations = {
  id: "01a0e983-92dd-74c8-80ca-87c8f4111691",
  type: "page-type/all-about-alan-topic",
  slug: "undefined-expectations",
  title: "Undefined Expectations",
  definition: "the load of expectations nobody has defined, and what defining them costs me",
  parents: ["all-about-alan-topic/holding-a-trip"],
  related: [
    "all-about-alan-topic/holding-a-responsibility",
    "all-about-alan-topic/what-criticism-does-to-me",
  ],
  settled:
    "I think the weight of a trip is the load of expectations, especially undefined expectations.\n\nAn undefined expectation has no edge, so there is never a moment when nothing more can be done. I cannot take a step toward it and I cannot park it, so it sits in the slot for the whole trip.\n\nThe obvious intervention is defining them, but that is a level 5 conversation. Defining them is negotiation, and negotiation inherently brings a risk of conflict and criticism.\n\nOn 28 September 2026, the day before a ten-day trip, I was at a 2.",
} as const satisfies AllAboutAlanTopic
