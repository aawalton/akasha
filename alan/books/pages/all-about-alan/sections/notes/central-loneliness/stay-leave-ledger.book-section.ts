import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const stayLeaveLedger = {
  id: "01a06594-c676-7006-aeb8-32cd1f7ee82e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "stay-leave-ledger",
  title: "The stay-or-leave ledger",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/central-loneliness"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
