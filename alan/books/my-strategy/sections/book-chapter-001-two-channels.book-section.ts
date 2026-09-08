import type { BookSection } from "../../../library/reading/book-chapters/book-section.page-type.ts"

export const bookChapter001TwoChannels = {
  id: "01a06594-c68f-7001-bed1-b81da26c402c",
  pageTypeSlug: "book-section",
  slug: "book-chapter-001-two-channels",
  title: "The two channels",
  sectionOfSlug: "my-strategy",
  position: 1,
  partOfSlugs: ["my-strategy"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
