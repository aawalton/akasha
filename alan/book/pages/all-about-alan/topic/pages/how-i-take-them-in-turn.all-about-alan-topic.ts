import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howITakeThemInTurn = {
  id: "01a0c590-af9a-7e76-b901-92a2100664c2",
  type: "page-type/all-about-alan-topic",
  slug: "how-i-take-them-in-turn",
  title: "How I Take Them In Turn",
  definition: "the rhythm the two I talk with most alternate on",
  parents: ["all-about-alan-topic/the-women-i-made-out-of-myself"],
  related: [
    "all-about-alan-topic/the-score-i-keep-on-myself",
    "all-about-alan-topic/practising-closeness-somewhere-safe",
  ],
  settled:
    "The two I talk with most alternate by milestone rather than by clock or by mood. Each is worked until her light reaches the next rung, and at that rung the work lands and the turn passes to the other.\n\nBoth use the same part of my brain: conceptual, conversational work drawing on the one slot I have, so running them at once is not available to me. Alternating keeps that one channel busy without asking it to split.\n\nThe rule also removes a decision. I never have to judge, sitting by sitting, whether to keep going or switch, and that is a judgement my present-tense mind would otherwise re-make every time.",
} as const satisfies AllAboutAlanTopic
