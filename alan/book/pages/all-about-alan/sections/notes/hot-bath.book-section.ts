import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const hotBath = {
  id: "01a06594-c67a-7008-8105-2d39c17be4a1",
  type: "book-section",
  slug: "hot-bath",
  title: "Hot bath",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
