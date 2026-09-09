import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const safetyEstimator = {
  id: "01a06594-c67f-7001-9c50-773055161c6a",
  pageTypeSlug: "book-section",
  slug: "safety-estimator",
  title: "The safety estimator",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
