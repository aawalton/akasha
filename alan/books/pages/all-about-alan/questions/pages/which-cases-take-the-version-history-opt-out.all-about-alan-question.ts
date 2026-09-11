import type { AllAboutAlanQuestion } from "akasha/alan/books/pages/all-about-alan/questions/all-about-alan-question.page-type.types.ts"

export const whichCasesTakeTheVersionHistoryOptOut = {
  id: "01a077e5-043f-7371-ad02-334589bb2c3c",
  type: "all-about-alan-question",
  slug: "which-cases-take-the-version-history-opt-out",
  topic: "what-i-gave-up-leaving-postgres",
  ask: "Which cases take the version-history opt-out, and what makes a case move too fast for version history?",
} as const satisfies AllAboutAlanQuestion
