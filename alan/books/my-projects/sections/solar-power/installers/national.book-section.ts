import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const national = {
  id: "01a06594-c68d-7015-89b5-ae0c218f5068",
  pageTypeSlug: "book-section",
  slug: "national",
  title: "National Installers",
  sectionOfSlug: "book-section/solar-power/installers",
  description: "National multi-state solar installers with Utah / Provo presence.",
  partOfCollectionSlugs: ["book-section/solar-power/installers"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
