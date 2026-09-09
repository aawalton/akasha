import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const sensoryRegulationTools = {
  id: "01a06594-c683-700b-9a93-629abf71342e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "sensory-regulation-tools",
  title: "Sensory-regulation tools",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
