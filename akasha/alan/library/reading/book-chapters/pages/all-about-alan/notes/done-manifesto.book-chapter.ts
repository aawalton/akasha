import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const doneManifesto = {
  id: "01a06594-c677-7012-9799-c272cd22068e",
  pageTypeSlug: "book-chapter",
  slug: "done-manifesto",
  title: "The Done Manifesto",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
