import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const specialInterests = {
  id: "01a06591-9ed3-7002-aec8-e44057fb0afb",
  pageTypeSlug: "book-chapter",
  slug: "special-interests",
  title: "Special interests",
  description:
    'Special interests — sustained deep interests via "same context, novel content"; the autism × ADHD intersection.',
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
