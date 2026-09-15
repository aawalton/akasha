import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const wantingAsGauge = {
  id: "01a06594-c686-7003-935c-1952b4a3c47b",
  type: "page-type/book-section",
  slug: "wanting-as-gauge",
  title: "Wanting as a gauge",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
