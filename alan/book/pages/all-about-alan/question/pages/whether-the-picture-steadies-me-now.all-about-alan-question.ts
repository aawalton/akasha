import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherThePictureSteadiesMeNow = {
  id: "01a077ed-2384-7ab5-9a73-63e8752ae42e",
  type: "page-type/all-about-alan-question",
  slug: "whether-the-picture-steadies-me-now",
  topic: "all-about-alan-topic/what-this-life-is-for",
  ask: "Does the picture give me steadiness I can feel in the present, once my safety comes back far enough to read one?",
} as const satisfies AllAboutAlanQuestion
