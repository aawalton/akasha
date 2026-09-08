import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const regional = {
  id: "01a06594-c68d-7017-8b1c-cb1325796bdc",
  pageTypeSlug: "book-section",
  slug: "regional",
  title: "Regional Installers",
  sectionOfSlug: "book-section/solar-power/installers",
  description: "Regional / multi-state solar installers serving Provo, UT.",
  partOfCollectionSlugs: ["book-section/solar-power/installers"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
