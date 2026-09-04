import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const whatCanBeSaid = {
  id: "01a06594-c68e-7017-9a4c-626e6985ba96",
  pageTypeSlug: "book-chapter",
  slug: "what-can-be-said",
  title: "What can be said about an illegible number",
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
