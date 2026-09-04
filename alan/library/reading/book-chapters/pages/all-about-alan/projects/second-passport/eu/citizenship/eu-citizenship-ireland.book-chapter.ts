import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipIreland = {
  id: "01a06594-c688-7008-8f40-d97ab048fdbc",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-ireland",
  title: "Ireland — Paths to Citizenship (May 2026)",
  description:
    "All paths to Irish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
