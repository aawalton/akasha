import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const resource = {
  id: "01a06594-c68d-7002-82b7-c6c949575efb",
  type: "page-type/book-section",
  slug: "resource",
  title: "Solar Resource at Provo",
  sectionOf: "book-section/solar-power/efficiency-factors",
  description:
    "Solar resource at Provo, UT — annual and monthly GHI/DNI, peak sun hours, altitude bonus. The denominator before any roof factor.",
  partOfCollections: ["book-section/solar-power/efficiency-factors", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
