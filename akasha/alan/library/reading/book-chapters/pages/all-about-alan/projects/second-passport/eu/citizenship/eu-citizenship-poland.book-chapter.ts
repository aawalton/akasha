import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipPoland = {
  id: "01a06594-c688-700f-a757-fb83a8414c3a",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-poland",
  title: "Polish Citizenship Paths (May 2026)",
  description:
    "All paths to Polish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (tolerated), and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
