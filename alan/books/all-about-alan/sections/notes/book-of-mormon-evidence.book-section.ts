import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const bookOfMormonEvidence = {
  id: "01a06594-c675-7015-85dd-2d7913784b1e",
  pageTypeSlug: "book-section",
  slug: "book-of-mormon-evidence",
  title: "Book of Mormon evidence",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
