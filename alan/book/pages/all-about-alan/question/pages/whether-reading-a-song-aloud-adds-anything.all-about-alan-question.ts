import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherReadingASongAloudAddsAnything = {
  id: "01a077e6-608b-77c2-ac27-4ea5d7f1534c",
  type: "all-about-alan-question",
  slug: "whether-reading-a-song-aloud-adds-anything",
  topic: "all-about-alan-topic/how-a-song-reaches-me",
  ask: "Does reading a song aloud with someone add anything beyond unpacking that song alone, or is the lift being met, paying separately?",
} as const satisfies AllAboutAlanQuestion
