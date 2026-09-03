import type { BookChapter } from "../../../../../../book-chapter.page-type.ts"

export const euCitizenshipFinland = {
  id: "01a06594-c688-7003-a8e9-6614da35a78c",
  pageTypeSlug: "book-chapter",
  slug: "eu-citizenship-finland",
  title: "Finland",
  description:
    "All paths to Finnish citizenship as of May 2026 — requirements, timelines, dual-citizenship policy, and current backlogs per path.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
