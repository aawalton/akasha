import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichWordsBecomeALevelsCue = {
  id: "01a077e1-dcf7-7df8-8e8a-10d190bc0ecf",
  type: "page-type/all-about-alan-question",
  slug: "which-words-become-a-levels-cue",
  topic: "all-about-alan-topic/how-i-remember-anything",
  ask: "When I split a passage into levels, what makes one word rather than another become the cue for a level?",
} as const satisfies AllAboutAlanQuestion
