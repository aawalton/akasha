import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euCitizenshipSpain = {
  id: "01a06594-c689-7004-8cf0-57889c76aabd",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-spain",
  title: "Spain — Paths to Citizenship (May 2026)",
  description:
    "All paths to Spanish citizenship as of May 2026 — requirements, timelines, asymmetric dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
