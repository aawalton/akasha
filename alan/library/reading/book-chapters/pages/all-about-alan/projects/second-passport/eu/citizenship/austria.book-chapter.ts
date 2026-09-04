import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const austria = {
  id: "01a06594-c687-700e-b0ee-63911c0ab9f4",
  pageTypeSlug: "book-chapter",
  slug: "austria",
  title: "Austria",
  description:
    "All paths to Austrian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
