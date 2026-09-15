import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const learnedResponseTaxonomy = {
  id: "01a06594-c67a-7017-8351-28082b9998bf",
  type: "book-section",
  slug: "learned-response-taxonomy",
  title: "Learned-response taxonomy",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
