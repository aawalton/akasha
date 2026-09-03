import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const rumination = {
  id: "01a06594-c67c-7015-bdf5-300ee8d7ead6",
  pageTypeSlug: "book-chapter",
  slug: "rumination",
  title: "Rumination",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
