import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const croatia = {
  id: "01a06594-c687-7011-9211-ca599b6fa065",
  pageTypeSlug: "book-chapter",
  slug: "croatia",
  title: "Croatian Citizenship Paths",
  description:
    "All paths to Croatian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
