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
  createdAt: "2026-09-03T04:44:04.109Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
