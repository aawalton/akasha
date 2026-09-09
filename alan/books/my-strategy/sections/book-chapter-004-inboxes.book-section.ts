import type { BookSection } from "../../../library/reading/book-chapters/book-section.page-type.ts"

export const bookChapter004Inboxes = {
  id: "01a06594-c68f-7004-bc4f-08f16f304f01",
  pageTypeSlug: "book-section",
  slug: "book-chapter-004-inboxes",
  title: "My inboxes",
  sectionOf: "my-strategy",
  position: 4,
  partOfCollections: ["my-strategy"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
