import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipCzechia = {
  id: "01a06594-c688-7000-90d1-0b142df1ddaa",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-czechia",
  title: "Czech Citizenship Paths (May 2026)",
  description:
    "All paths to Czech citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
