import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipRomania = {
  id: "01a06594-c689-7001-8eeb-5bd754d1f064",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-romania",
  title: "Romanian Citizenship Paths",
  description:
    "All paths to Romanian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path (esp. Article 11 reacquisition).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
