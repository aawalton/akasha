import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const sensoryCostModulation = {
  id: "01a06594-c67f-7000-a942-e8acb57bfdd7",
  type: "page-type/book-section",
  slug: "sensory-cost-modulation",
  title: "Safety modulates sensory cost",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/safety"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
