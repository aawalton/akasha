import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const bedrock = {
  id: "01a06594-c675-7011-96ce-8b7616386a56",
  pageTypeSlug: "book-chapter",
  slug: "bedrock",
  title: "The bedrock — Freedom and Self-Improvement, one welded root",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
