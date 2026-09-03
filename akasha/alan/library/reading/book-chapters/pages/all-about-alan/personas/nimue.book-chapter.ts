import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const nimue = {
  id: "01a06594-c687-7005-9207-1dc4969ed1b2",
  pageTypeSlug: "book-chapter",
  slug: "nimue",
  title: "Nimue",
  description:
    "Nimue — Aine's technology-scout lieutenant on the Wealth axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
