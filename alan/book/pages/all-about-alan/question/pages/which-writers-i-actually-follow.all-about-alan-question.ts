import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichWritersIActuallyFollow = {
  id: "01a0c5a6-9044-7396-9137-95a9e1e17d0b",
  type: "page-type/all-about-alan-question",
  slug: "which-writers-i-actually-follow",
  topic: "all-about-alan-topic/a-platform-that-stays-out-of-the-way",
  ask: "Which writers do I actually read on Substack, what does each cover, and which would I follow off the platform?",
} as const satisfies AllAboutAlanQuestion
