import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const invisibleConstraints = {
  id: "01a06594-c67a-7014-a655-2e082a534002",
  pageTypeSlug: "book-chapter",
  slug: "invisible-constraints",
  title: "Invisible constraints",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
