import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const informationAndMedia = {
  id: "01a06594-c67a-700e-b08b-e7f748c7065f",
  pageTypeSlug: "book-chapter",
  slug: "information-and-media",
  title: "Information and media",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
