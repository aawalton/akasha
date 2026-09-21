import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theSurplusITryToStayAbove = {
  id: "01a0c58f-f062-7e4c-92f1-50e80bc79acc",
  type: "page-type/all-about-alan-topic",
  slug: "the-surplus-i-try-to-stay-above",
  title: "The Surplus I Try To Stay Above",
  definition: "the numbered rungs my capacity surplus falls on, and the one I aim to keep over",
  parents: ["all-about-alan-topic/health-bar"],
  related: [
    "all-about-alan-topic/the-budget-i-run-my-days-on",
    "all-about-alan-topic/safety-level",
  ],
  settled:
    "Alongside the percentage I carry a numbered scale, four capacity hours to a rung, running parallel to my safety levels.\n\nLevel nought is exactly even, no surplus and no deficit. Level one is up to four hours of surplus, level two up to eight, level three up to twelve. Minus one is a deficit of up to four hours, minus two of up to eight, minus three of up to twelve.\n\nThe scale does not stop at three. It goes on upward.\n\nWhat I aim at is staying above level three. Under it my nervous system still recovers, just slower than it could. Over it the arithmetic runs where it compounds upward.\n\nThe whole recovery stack is built around that one threshold.",
} as const satisfies AllAboutAlanTopic
