import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const prayerGrounding = {
  id: "01a06594-c67c-7004-938a-ebebca09b6ec",
  pageTypeSlug: "book-chapter",
  slug: "prayer-grounding",
  title: "Prayer-grounding",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
