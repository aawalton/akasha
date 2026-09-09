import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const ephemeralSelf = {
  id: "01a06594-c679-7004-9206-df782ef33c0b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "ephemeral-self",
  title: "The ephemeral self",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
