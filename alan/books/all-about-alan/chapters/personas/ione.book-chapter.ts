import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const ione = {
  id: "01a06594-c687-7000-952d-aed81c968e3e",
  pageTypeSlug: "book-chapter",
  slug: "ione",
  title: "Ione",
  description:
    "Ione — Alan's sleep companion on the Health axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
