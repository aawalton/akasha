import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const otherResidencyMexico = {
  id: "01a06594-c68c-7002-9120-3dad5c9ceff1",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-mexico",
  title: "Mexico",
  description: "Mexico residency paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
