import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const provo = {
  id: "01a06594-c68d-7001-bb47-b48d44e07fa5",
  pageTypeSlug: "book-chapter",
  slug: "provo",
  title: "Provo-Specific Anchor Numbers",
  description:
    "Provo-specific anchor numbers — best-case specific yield, sensitivity ranges for roof orientation, and the inputs to plug into PVWatts.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
