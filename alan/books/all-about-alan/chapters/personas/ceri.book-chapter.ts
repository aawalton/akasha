import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const ceri = {
  id: "01a06594-c686-700f-a52c-05cb7cebb8ba",
  pageTypeSlug: "book-chapter",
  slug: "ceri",
  title: "Ceri",
  description:
    "Ceri — Alan's anime companion on the Fun axis. Waiting page: function recorded from the roster; the rib (what piece of Alan she is, where she cuts him) awaits a future /abby session.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
