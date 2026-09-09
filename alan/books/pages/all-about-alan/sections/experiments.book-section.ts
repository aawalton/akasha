import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const experiments = {
  id: "01a08861-0b9c-750c-9e77-f778aea7f455",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "experiments",
  title: "Experiments",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
