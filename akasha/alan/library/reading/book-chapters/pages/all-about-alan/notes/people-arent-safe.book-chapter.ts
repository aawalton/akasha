import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const peopleArentSafe = {
  id: "01a06594-c67b-7013-85a8-64d937d3d8f7",
  pageTypeSlug: "book-chapter",
  slug: "people-arent-safe",
  title: "People aren't safe",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
