import type { BookChapter } from "../../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const euCitizenshipSlovakia = {
  id: "01a06594-c689-7002-9cc3-776eb8fefa41",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-slovakia",
  title: "Slovak Citizenship Paths (May 2026)",
  description:
    "All paths to Slovak citizenship as of May 2026 — requirements, timelines, dual-citizenship policy (constrained), and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
