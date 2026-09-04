import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euCitizenshipFrance = {
  id: "01a06594-c688-7004-b9ac-37c6df63fca2",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-france",
  title: "France",
  description:
    "All paths to French citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
