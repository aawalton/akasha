import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const triggerBasedMemory = {
  id: "01a06594-c685-700a-98a5-13eb6b786d38",
  pageTypeSlug: "book-chapter",
  slug: "trigger-based-memory",
  title: "Trigger-based memory",
  description:
    "Trigger-based memory — Alan's primary memory architecture. The same cue→concept retrieval mechanism runs across text memorization, talks, and the agent harness.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
