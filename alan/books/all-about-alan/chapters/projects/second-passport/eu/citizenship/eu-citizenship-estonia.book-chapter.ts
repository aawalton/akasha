import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euCitizenshipEstonia = {
  id: "01a06594-c688-7002-b5ce-a8fbcf1d8c53",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-estonia",
  title: "Estonian Citizenship Paths (May 2026)",
  description:
    "All paths to Estonian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (with the birthright-by-blood nuance), and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
