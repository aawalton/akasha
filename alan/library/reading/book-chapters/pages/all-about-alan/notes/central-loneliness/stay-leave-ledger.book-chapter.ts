import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const stayLeaveLedger = {
  id: "01a06594-c676-7006-aeb8-32cd1f7ee82e",
  pageTypeSlug: "book-chapter",
  slug: "stay-leave-ledger",
  title: "The stay-or-leave ledger",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
