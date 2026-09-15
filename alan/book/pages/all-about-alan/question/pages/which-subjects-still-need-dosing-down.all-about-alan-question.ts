import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichSubjectsStillNeedDosingDown = {
  id: "01a077e5-50a1-716f-be0a-548ac8f62a82",
  type: "page-type/all-about-alan-question",
  slug: "which-subjects-still-need-dosing-down",
  topic: "all-about-alan-topic/how-a-hard-talk-with-jen-gets-safer",
  ask: "Which subjects with Jen still have to be dosed down?",
} as const satisfies AllAboutAlanQuestion
