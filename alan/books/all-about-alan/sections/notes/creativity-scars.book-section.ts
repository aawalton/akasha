import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const creativityScars = {
  id: "01a06594-c677-7009-b29a-386f591c5548",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "creativity-scars",
  title: "Creativity scars",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
