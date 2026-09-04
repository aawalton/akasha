import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipPortugal = {
  id: "01a06594-c689-7000-9317-71323ba3e69c",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-portugal",
  title: "Portuguese Citizenship Paths (May 2026)",
  description:
    "All paths to Portuguese citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (post-Sephardic-closure, post-2025-reform).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
