import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const music = {
  id: "01a06594-c67b-700b-91eb-b7259ce4c0e7",
  pageTypeSlug: "book-section",
  slug: "music",
  title: "Music as cross-cutting bridge",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
