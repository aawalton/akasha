import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const discreteSelf = {
  id: "01a06594-c677-700f-a810-305f138cd48c",
  type: "book-section",
  slug: "discrete-self",
  title: "The discrete self",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
