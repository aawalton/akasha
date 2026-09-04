import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const otherCitizenshipIceland = {
  id: "01a06594-c68a-7010-8335-4d579c8c074d",
  pageTypeSlug: "book-chapter",
  slug: "other-citizenship-iceland",
  title: "Iceland",
  description: "Iceland citizenship paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
