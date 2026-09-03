import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipMalta = {
  id: "01a06594-c688-700d-8b7d-c6b504c5b380",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-malta",
  title: "Maltese Citizenship Paths (May 2026)",
  description:
    "All paths to Maltese citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (especially post-ECJ-ruling MEIN status).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
