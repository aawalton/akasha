import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatOurBudgetCannotTellUs = {
  id: "01a0c58e-0d64-716e-b45e-e316495f6fd3",
  type: "page-type/all-about-alan-topic",
  slug: "what-our-budget-cannot-tell-us",
  title: "What Our Budget Cannot Tell Us",
  definition: "the gap left by nine months of uncategorised spending",
  parents: ["all-about-alan-topic/why-our-money-arrangement-is-up-for-review"],
  settled:
    "The categorising is manual, Jen has owned it alone, and she is nine months behind.\n\nWe always know the total, because the total is just balances. What we do not have is budget balances.\n\nSo the gap does not blind us to how much there is or how fast it is going.\n\nWhat it costs is the breakdown. Which line a given spend went to, and so whether that spend was capacity or consumption.",
} as const satisfies AllAboutAlanTopic
