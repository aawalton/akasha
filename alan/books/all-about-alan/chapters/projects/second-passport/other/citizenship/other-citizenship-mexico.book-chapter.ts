import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const otherCitizenshipMexico = {
  id: "01a06594-c68b-7002-baa1-8a201b9c1377",
  pageTypeSlug: "book-chapter",
  slug: "other-citizenship-mexico",
  title: "Mexico",
  description: "Mexico citizenship paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
