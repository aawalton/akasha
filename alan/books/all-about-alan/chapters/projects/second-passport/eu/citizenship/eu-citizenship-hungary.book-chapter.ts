import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euCitizenshipHungary = {
  id: "01a06594-c688-7007-bb9d-345f54458eeb",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-hungary",
  title: "Hungarian Citizenship Paths",
  description:
    "All paths to Hungarian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
