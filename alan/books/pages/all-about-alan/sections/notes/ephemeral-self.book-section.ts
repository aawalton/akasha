import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const ephemeralSelf = {
  id: "01a06594-c679-7004-9206-df782ef33c0b",
  type: "book-section",
  slug: "ephemeral-self",
  title: "The ephemeral self",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
