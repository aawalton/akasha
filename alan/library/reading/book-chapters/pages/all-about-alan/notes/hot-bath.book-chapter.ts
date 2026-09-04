import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const hotBath = {
  id: "01a06594-c67a-7008-8105-2d39c17be4a1",
  pageTypeSlug: "book-chapter",
  slug: "hot-bath",
  title: "Hot bath",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
