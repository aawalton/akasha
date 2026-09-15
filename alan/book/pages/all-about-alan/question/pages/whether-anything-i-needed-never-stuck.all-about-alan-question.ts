import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherAnythingINeededNeverStuck = {
  id: "01a077e7-8f88-7c67-815e-7432b50362ff",
  type: "page-type/all-about-alan-question",
  slug: "whether-anything-i-needed-never-stuck",
  topic: "all-about-alan-topic/how-i-know-things",
  ask: "Nothing goes into my conceptual map on purpose. Has there been a point I needed in there that never stuck, and what did I do about the gap?",
} as const satisfies AllAboutAlanQuestion
