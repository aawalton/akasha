import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const harnessAttention = {
  id: "01a06594-c67a-7003-9cf5-4412f5923d6e",
  pageTypeSlug: "book-chapter",
  slug: "harness-attention",
  title: "Harness attention",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
