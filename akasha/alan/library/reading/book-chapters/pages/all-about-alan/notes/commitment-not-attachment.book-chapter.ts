import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const commitmentNotAttachment = {
  id: "01a06594-c676-700d-a590-5ab51251505b",
  pageTypeSlug: "book-chapter",
  slug: "commitment-not-attachment",
  title: "Commitment, not attachment",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
