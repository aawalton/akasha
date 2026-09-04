import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipGreece = {
  id: "01a06594-c688-7006-9a5a-e472102db961",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-greece",
  title: "Greek Citizenship Paths (May 2026)",
  description:
    "All paths to Greek citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
