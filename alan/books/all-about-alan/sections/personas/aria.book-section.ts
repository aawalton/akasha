import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const aria = {
  id: "01a06594-c686-700b-beee-930f2da17073",
  pageTypeSlug: "book-section",
  slug: "aria",
  title: "Aria",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
