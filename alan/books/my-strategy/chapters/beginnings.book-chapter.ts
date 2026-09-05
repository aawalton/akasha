import type { BookChapter } from "../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const beginnings = {
  id: "01a06594-c68f-7000-934e-35dfe3dc5ddf",
  pageTypeSlug: "book-chapter",
  slug: "beginnings",
  title: "My Strategy",
  position: 0,
  partOfSlugs: ["my-strategy"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
