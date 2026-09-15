import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichMotorSkillsIBuiltSlowly = {
  id: "01a077e5-63de-73dd-87dc-da74031c7cf2",
  type: "page-type/all-about-alan-question",
  slug: "which-motor-skills-i-built-slowly",
  topic: "all-about-alan-topic/how-i-learned-to-feel-my-body",
  ask: "Which other motor skills did I build the same slow way, beyond driving?",
} as const satisfies AllAboutAlanQuestion
