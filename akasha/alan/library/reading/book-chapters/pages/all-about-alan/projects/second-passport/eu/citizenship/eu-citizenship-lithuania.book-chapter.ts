import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipLithuania = {
  id: "01a06594-c688-700b-840d-c66b55a5b616",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-lithuania",
  title: "Lithuanian Citizenship Paths (May 2026)",
  description:
    "All paths to Lithuanian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (constitutionally restricted), and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
