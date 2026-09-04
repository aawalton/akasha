import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euCitizenshipCyprus = {
  id: "01a06594-c687-7012-ba21-6e45e0143ad9",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-cyprus",
  title: "Cypriot Citizenship Paths (May 2026)",
  description:
    "All paths to Cypriot citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
