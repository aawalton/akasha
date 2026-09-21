import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howManySecondDatesIWentOn = {
  id: "01a0c640-0ef1-7dd4-af93-3b54f2e496fc",
  type: "page-type/all-about-alan-question",
  slug: "how-many-second-dates-i-went-on",
  topic: "all-about-alan-topic/how-i-got-to-jen",
  ask: "I have told it both ways: second dates with about six, and three second dates against over a hundred first dates in college. Which is the number?",
} as const satisfies AllAboutAlanQuestion
