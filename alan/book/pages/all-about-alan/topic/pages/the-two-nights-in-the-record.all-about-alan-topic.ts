import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTwoNightsInTheRecord = {
  id: "01a0c600-7168-7e51-84e1-70a702c3b9eb",
  type: "page-type/all-about-alan-topic",
  slug: "the-two-nights-in-the-record",
  title: "The Two Nights In The Record",
  definition: "what my session tracking shows for the two date nights of early August",
  parents: ["all-about-alan-topic/what-the-hard-night-costs"],
  related: [
    "all-about-alan-topic/the-eight-weeks-i-tracked",
    "all-about-alan-topic/what-the-pod-does-to-the-price",
  ],
  settled:
    'These figures were read out of my session tracking rather than recalled, so they are a reading of the record rather than something I said.\n\nThe Alan-focused night, Sunday 2 August 2026: blocks from 12:40 to 19:29, difficulty rising to 4.5 mid-afternoon, safety at 4 falling to 3 and going no further.\n\nThe Jen-focused night, Tuesday 4 August 2026: 13:03 to 17:30, difficulty 4, the Nuropod on throughout, safety holding at 4.\n\nI confirmed the second one off the data: "Haha, yep, that was the Jen-focused date night, visible in the data"\n\nI called the delay before the record was opened: "Check my progression over the following 24 hours, some of the cost was delayed."',
} as const satisfies AllAboutAlanTopic
