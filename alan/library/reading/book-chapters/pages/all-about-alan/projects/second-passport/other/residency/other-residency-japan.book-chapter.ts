import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const otherResidencyJapan = {
  id: "01a06594-c68c-7000-bb95-2c864c7e4f4c",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-japan",
  title: "Japan",
  description: "Japan residency paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
