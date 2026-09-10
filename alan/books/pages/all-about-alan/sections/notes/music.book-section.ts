import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const music = {
  id: "01a06594-c67b-700b-91eb-b7259ce4c0e7",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "music",
  title: "Music as cross-cutting bridge",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
