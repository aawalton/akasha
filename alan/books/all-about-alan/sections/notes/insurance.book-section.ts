import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const insurance = {
  id: "01a06594-c67a-7011-b244-b64b22cf1bec",
  pageTypeSlug: "book-section",
  slug: "insurance",
  title: "Insurance",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
