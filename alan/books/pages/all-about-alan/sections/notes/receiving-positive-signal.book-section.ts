import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const receivingPositiveSignal = {
  id: "01a06594-c67c-7009-b01e-978647cc71dd",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "receiving-positive-signal",
  title: "Receiving positive signal",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
