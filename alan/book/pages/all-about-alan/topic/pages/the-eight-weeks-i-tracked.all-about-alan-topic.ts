import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theEightWeeksITracked = {
  id: "01a0c5a4-096c-7f8e-ae93-bfeb15aa48f6",
  type: "page-type/all-about-alan-topic",
  slug: "the-eight-weeks-i-tracked",
  title: "The Eight Weeks I Tracked",
  definition: "what my own tracking says about my safety across the summer of 2026",
  parents: ["all-about-alan-topic/safety-years"],
  related: [
    "all-about-alan-topic/my-safety-read-in-medians",
    "all-about-alan-topic/the-rating-my-budget-rests-on",
  ],
  settled:
    "These figures were measured off my session tracking and read back to me, so they are a reading of the record rather than something I said.\n\nEight weeks, 12 June to 6 August 2026. Thirty-eight days carry tracked blocks and eighteen are blank, the blanks clustered around the Europe trip.\n\nWeighted by duration my mean safety across the window is 3.37, and the median of the daily means is 3.39.\n\nAt that rate I accumulate about 3.37 safety years a year, against roughly one a year across the eighteen. The band matters more than the rate. One is functioning and 3.37 is living.",
} as const satisfies AllAboutAlanTopic
