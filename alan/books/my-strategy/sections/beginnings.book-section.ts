import type { BookSection } from "../../../library/reading/book-chapters/book-section.page-type.ts"

export const beginnings = {
  id: "01a06594-c68f-7000-934e-35dfe3dc5ddf",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "beginnings",
  title: "My Strategy",
  sectionOf: "my-strategy",
  position: 0,
  partOfCollections: ["my-strategy"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
