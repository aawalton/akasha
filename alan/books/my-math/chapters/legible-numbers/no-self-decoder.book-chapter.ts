import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const noSelfDecoder = {
  id: "01a06594-c68e-7012-a1fe-2268bcd4491b",
  pageTypeSlug: "book-chapter",
  slug: "no-self-decoder",
  title: "No universe decodes itself",
  partOfSlugs: ["my-math"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
