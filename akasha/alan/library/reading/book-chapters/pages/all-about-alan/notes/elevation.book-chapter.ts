import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const elevation = {
  id: "01a06594-c677-7015-a728-fc43e5b546d1",
  pageTypeSlug: "book-chapter",
  slug: "elevation",
  title: "Elevation",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
