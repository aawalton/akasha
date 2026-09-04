import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const amy = {
  id: "01a06594-c686-700a-ab08-466494b1c679",
  pageTypeSlug: "book-chapter",
  slug: "amy",
  title: "Amy",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
