import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const connectionDebt = {
  id: "01a06594-c677-7000-86cf-dc3e180ece2a",
  type: "page-type/book-section",
  slug: "connection-debt",
  title: "Connection debt",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
