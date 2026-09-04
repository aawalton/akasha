import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euCitizenshipGermany = {
  id: "01a06594-c688-7005-a595-4872ae8b6994",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-germany",
  title: "Germany",
  description:
    "All paths to German citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (post-2024 reform), and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
