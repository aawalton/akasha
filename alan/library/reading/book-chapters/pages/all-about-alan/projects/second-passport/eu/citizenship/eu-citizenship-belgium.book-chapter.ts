import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipBelgium = {
  id: "01a06594-c687-700f-b388-76ec798249b5",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-belgium",
  title: "Belgian Citizenship Paths (May 2026)",
  description:
    "All paths to Belgian citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
