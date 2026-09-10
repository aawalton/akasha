import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const sensoryCostModulation = {
  id: "01a06594-c67f-7000-a942-e8acb57bfdd7",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "sensory-cost-modulation",
  title: "Safety modulates sensory cost",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/safety"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
