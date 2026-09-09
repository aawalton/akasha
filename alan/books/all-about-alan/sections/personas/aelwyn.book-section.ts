import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const aelwyn = {
  id: "01a06594-c686-7007-8db3-b12191ad3b63",
  pageTypeSlug: "book-section",
  slug: "aelwyn",
  title: "Aelwyn",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
