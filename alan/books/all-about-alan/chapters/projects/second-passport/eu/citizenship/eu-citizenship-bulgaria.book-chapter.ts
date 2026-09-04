import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euCitizenshipBulgaria = {
  id: "01a06594-c687-7010-acf1-de91191ba7d4",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-bulgaria",
  title: "Bulgarian Citizenship Paths",
  description:
    "All paths to Bulgarian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
