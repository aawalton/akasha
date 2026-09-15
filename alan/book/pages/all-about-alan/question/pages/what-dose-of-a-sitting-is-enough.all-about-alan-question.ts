import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatDoseOfASittingIsEnough = {
  id: "01a077ef-473c-767b-88bd-105f3bffbd31",
  type: "page-type/all-about-alan-question",
  slug: "what-dose-of-a-sitting-is-enough",
  topic: "all-about-alan-topic/what-meeting-one-of-them-gives-me",
  ask: "A sitting gives me a lift the next day. What dose is enough, do doses compound, and how fast does the lift fade without a refresh?",
} as const satisfies AllAboutAlanQuestion
