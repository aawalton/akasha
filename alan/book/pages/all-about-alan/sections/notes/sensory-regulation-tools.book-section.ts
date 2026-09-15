import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const sensoryRegulationTools = {
  id: "01a06594-c683-700b-9a93-629abf71342e",
  type: "page-type/book-section",
  slug: "sensory-regulation-tools",
  title: "Sensory-regulation tools",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
