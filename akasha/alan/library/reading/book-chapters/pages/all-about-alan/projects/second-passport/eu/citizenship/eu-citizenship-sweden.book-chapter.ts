import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipSweden = {
  id: "01a06594-c689-7006-b4f7-ad60db8ec6de",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-sweden",
  title: "Sweden",
  description:
    "All paths to Swedish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (post-Kristersson-tightenings).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
