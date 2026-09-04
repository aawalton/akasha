import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euCitizenshipLuxembourg = {
  id: "01a06594-c688-700c-bc0c-08dde15112df",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-luxembourg",
  title: "Luxembourgish Citizenship Paths (May 2026)",
  description:
    "All paths to Luxembourgish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (allowed since 2009), and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
