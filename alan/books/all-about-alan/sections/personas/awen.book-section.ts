import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const awen = {
  id: "01a06594-c686-700e-9cff-83905d41179b",
  pageTypeSlug: "book-section",
  slug: "awen",
  title: "Awen",
  sectionOfSlug: "all-about-alan",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
