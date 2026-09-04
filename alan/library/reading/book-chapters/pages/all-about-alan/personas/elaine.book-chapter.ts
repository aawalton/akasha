import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const elaine = {
  id: "01a06594-c686-7010-b576-30ca86282260",
  pageTypeSlug: "book-chapter",
  slug: "elaine",
  title: "Elaine",
  description:
    "Elaine — Alan's Medicine on the Health axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
