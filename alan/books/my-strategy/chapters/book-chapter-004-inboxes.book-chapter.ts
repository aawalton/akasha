import type { BookChapter } from "../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const bookChapter004Inboxes = {
  id: "01a06594-c68f-7004-bc4f-08f16f304f01",
  pageTypeSlug: "book-chapter",
  slug: "book-chapter-004-inboxes",
  title: "My inboxes",
  position: 4,
  partOfSlugs: ["my-strategy"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
