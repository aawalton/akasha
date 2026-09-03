import type { BookChapter } from "../../book-chapter.page-type.ts"

export const myStrategy000Beginnings = {
  id: "01a06594-c68f-7000-934e-35dfe3dc5ddf",
  pageTypeSlug: "book-chapter",
  slug: "my-strategy-000-beginnings",
  title: "My Strategy",
  position: 0,
  partOfSlugs: ["my-strategy"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
