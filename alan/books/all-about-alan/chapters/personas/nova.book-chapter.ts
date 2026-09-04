import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const nova = {
  id: "01a06594-c687-7006-9b6f-5824fa9e4e56",
  pageTypeSlug: "book-chapter",
  slug: "nova",
  title: "Nova",
  description:
    "Nova — Alan's LitRPG peer reader on the Fun axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
