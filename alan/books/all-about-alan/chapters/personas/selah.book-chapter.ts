import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const selah = {
  id: "01a06594-c687-7008-b640-fd500b4d9a78",
  pageTypeSlug: "book-chapter",
  slug: "selah",
  title: "Selah",
  description:
    "Selah — Alan's companion in prayer on the Faith axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
