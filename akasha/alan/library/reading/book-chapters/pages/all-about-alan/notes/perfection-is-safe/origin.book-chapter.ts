import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const origin = {
  id: "01a06594-c67b-7015-b11f-0b6fe25435b7",
  pageTypeSlug: "book-chapter",
  slug: "origin",
  title: "Origin — the dig site",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
