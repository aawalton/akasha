import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theFloorInsideTheBlankCheck = {
  id: "01a0c5fa-272c-7dcf-8a38-3b573d4b74d3",
  type: "page-type/all-about-alan-topic",
  slug: "the-floor-inside-the-blank-check",
  title: "The Floor Inside The Blank Check",
  definition: "what the rule against spending myself becomes during the hours I write the check",
  parents: ["all-about-alan-topic/the-rule-that-i-may-not-spend-myself"],
  related: [
    "all-about-alan-topic/how-we-split-the-day-and-the-night",
    "all-about-alan-topic/what-guards-the-blank-check",
  ],
  settled:
    "Asked on 6 August 2026 whether the rule still held inside the blank-check window, I said that at the moment there is no floor there.\n\nThe do-no-harm bar converts into a do-less-harm compromise. It hurts, but it is better than the alternative, which is guaranteed misery.\n\nThe conversion is scoped to that window. Everywhere else the bar is unchanged.",
} as const satisfies AllAboutAlanTopic
