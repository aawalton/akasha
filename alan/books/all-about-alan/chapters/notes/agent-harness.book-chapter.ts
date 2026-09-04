import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const agentHarness = {
  id: "01a06594-c674-7008-839c-893beadb8b48",
  pageTypeSlug: "book-chapter",
  slug: "agent-harness",
  title: "Agent harness",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
