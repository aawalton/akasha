import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const aura = {
  id: "01a06594-c686-700d-90ca-81bde6d056c5",
  pageTypeSlug: "book-section",
  slug: "aura",
  title: "Aura",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
