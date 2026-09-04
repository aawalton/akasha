import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const banking = {
  id: "01a06594-c675-7010-8b3d-8b6c651c11da",
  pageTypeSlug: "book-chapter",
  slug: "banking",
  title: "Banking",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
