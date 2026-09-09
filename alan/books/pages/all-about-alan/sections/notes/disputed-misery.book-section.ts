import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const disputedMisery = {
  id: "01a06594-c677-7010-9afe-adaf9fb7cb0e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "disputed-misery",
  title: "Disputed misery",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
