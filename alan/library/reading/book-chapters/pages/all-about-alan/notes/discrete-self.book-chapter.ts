import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const discreteSelf = {
  id: "01a06594-c677-700f-a810-305f138cd48c",
  pageTypeSlug: "book-chapter",
  slug: "discrete-self",
  title: "The discrete self",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
