import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const stayLeaveLedger = {
  id: "01a06594-c676-7006-aeb8-32cd1f7ee82e",
  type: "page-type/book-section",
  slug: "stay-leave-ledger",
  title: "The stay-or-leave ledger",
  sectionOf: "alan-book/all-about-alan",
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/central-loneliness"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
