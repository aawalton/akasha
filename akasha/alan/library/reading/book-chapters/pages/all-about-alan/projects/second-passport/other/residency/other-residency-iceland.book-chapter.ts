import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const otherResidencyIceland = {
  id: "01a06594-c68b-7017-9f6b-0b462b32e583",
  pageTypeSlug: "book-chapter",
  slug: "other-residency-iceland",
  title: "Iceland",
  description: "Iceland residency paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
