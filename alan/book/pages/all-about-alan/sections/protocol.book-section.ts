import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const protocol = {
  id: "01a06594-c674-7001-ad82-e261e73f2d37",
  type: "page-type/book-section",
  slug: "protocol",
  title: "Exp 4 — voice-reward DOSE test (long-message)",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: [
    "alan-book/all-about-alan",
    "book-section/experiments/exp4-voice-reward-dose",
  ],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
