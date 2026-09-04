import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const highThroughputRoad = {
  id: "01a06594-c67a-7006-8b9a-f2962e02135d",
  pageTypeSlug: "book-chapter",
  slug: "high-throughput-road",
  title: "The high-throughput road",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
