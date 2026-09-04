import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const learnedResponseTaxonomy = {
  id: "01a06594-c67a-7017-8351-28082b9998bf",
  pageTypeSlug: "book-chapter",
  slug: "learned-response-taxonomy",
  title: "Learned-response taxonomy",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
