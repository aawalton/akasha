import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const envelope = {
  id: "01a06594-c68d-7012-bfd6-a940cb9498af",
  type: "page-type/book-section",
  slug: "envelope",
  title: "Envelope Retrofit Decision",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Envelope retrofit decision for a 1970s 6000 sq ft Provo house — assessment options, retrofit packages ranked by leverage, and recommended sequence.",
  partOfCollections: ["book-section/my-projects/solar-power", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
