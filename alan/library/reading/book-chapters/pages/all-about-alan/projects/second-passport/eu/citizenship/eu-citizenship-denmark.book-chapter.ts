import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipDenmark = {
  id: "01a06594-c688-7001-89b2-d97ba79f1ad9",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-denmark",
  title: "Denmark",
  description:
    "All paths to Danish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
