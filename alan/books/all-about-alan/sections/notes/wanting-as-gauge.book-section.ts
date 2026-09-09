import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const wantingAsGauge = {
  id: "01a06594-c686-7003-935c-1952b4a3c47b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "wanting-as-gauge",
  title: "Wanting as a gauge",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
