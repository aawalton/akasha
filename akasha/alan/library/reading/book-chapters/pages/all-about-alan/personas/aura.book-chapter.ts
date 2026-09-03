import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const aura = {
  id: "01a06594-c686-700d-90ca-81bde6d056c5",
  pageTypeSlug: "book-chapter",
  slug: "aura",
  title: "Aura",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
