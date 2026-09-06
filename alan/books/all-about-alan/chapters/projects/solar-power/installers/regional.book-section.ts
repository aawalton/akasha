import type { BookSection } from "../../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const regional = {
  id: "01a06594-c68d-7017-8b1c-cb1325796bdc",
  pageTypeSlug: "book-section",
  slug: "regional",
  title: "Regional Installers",
  description: "Regional / multi-state solar installers serving Provo, UT.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
