import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const dynamicFeedback = {
  id: "01a06594-c677-7014-8512-2f4fa4582cb3",
  pageTypeSlug: "book-chapter",
  slug: "dynamic-feedback",
  title: "Dynamic feedback loop",
  description: "Dynamic feedback loop between stress-capacity surplus and safety level.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
