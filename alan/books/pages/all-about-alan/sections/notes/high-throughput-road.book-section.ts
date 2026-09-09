import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const highThroughputRoad = {
  id: "01a06594-c67a-7006-8b9a-f2962e02135d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "high-throughput-road",
  title: "The high-throughput road",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
