import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const contractions = {
  id: "01a06594-c675-7019-846e-8ec9fda60f9d",
  type: "page-type/book-section",
  slug: "contractions",
  title: "Lost everything that couldn't be made safe",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/central-loneliness"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
