import type { AllAboutAlanQuestion } from "../all-about-alan-question.page-type.types.ts"

export const whatTheGaugeDoesWhenTwoBarsAreLow = {
  id: "01a077ed-fd02-7d7c-9bb7-8d989e2b2eec",
  pageTypeSlug: "all-about-alan-question",
  type: "all-about-alan-question",
  slug: "what-the-gauge-does-when-two-bars-are-low",
  topic: "not-wanting-to-is-the-gauge",
  ask: "When two bars are low at once, or the signals conflict, does the gauge resolve which bar it is, or return an ambiguous read that vetoes anyway?",
} as const satisfies AllAboutAlanQuestion
