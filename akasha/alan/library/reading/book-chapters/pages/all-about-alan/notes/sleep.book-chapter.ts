import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const sleep = {
  id: "01a06594-c684-7004-9a1d-cd525d551d37",
  pageTypeSlug: "book-chapter",
  slug: "sleep",
  title: "Sleep",
  description:
    "Sleep as a system — 9-10 hours, natural wake, bimodal onset, the opposite-signature mechanisms by which stress and Vyvanse each trim the night, and the in-bed wind-down stack.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
