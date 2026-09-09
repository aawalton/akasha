import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const stayLeaveLedger = {
  id: "01a06594-c676-7006-aeb8-32cd1f7ee82e",
  pageTypeSlug: "book-section",
  slug: "stay-leave-ledger",
  title: "The stay-or-leave ledger",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
