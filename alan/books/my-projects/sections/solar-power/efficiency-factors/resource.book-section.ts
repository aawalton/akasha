import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const resource = {
  id: "01a06594-c68d-7002-82b7-c6c949575efb",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "resource",
  title: "Solar Resource at Provo",
  sectionOf: "book-section/solar-power/efficiency-factors",
  description:
    "Solar resource at Provo, UT — annual and monthly GHI/DNI, peak sun hours, altitude bonus. The denominator before any roof factor.",
  partOfCollections: ["book-section/solar-power/efficiency-factors"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
