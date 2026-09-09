import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const aine = {
  id: "01a06594-c686-7008-b2fa-f1c8365475ad",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "aine",
  title: "Aine",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
