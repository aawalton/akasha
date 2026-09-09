import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const national = {
  id: "01a06594-c68d-7015-89b5-ae0c218f5068",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "national",
  title: "National Installers",
  sectionOf: "book-section/solar-power/installers",
  description: "National multi-state solar installers with Utah / Provo presence.",
  partOfCollections: ["book-section/solar-power/installers"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
