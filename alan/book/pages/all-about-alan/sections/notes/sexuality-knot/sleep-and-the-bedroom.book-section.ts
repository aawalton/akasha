import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const sleepAndTheBedroom = {
  id: "01a06594-c684-7000-a839-5ce2c6f7c4bc",
  type: "book-section",
  slug: "sleep-and-the-bedroom",
  title: "Sleep and the bedroom",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/sexuality-knot"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
