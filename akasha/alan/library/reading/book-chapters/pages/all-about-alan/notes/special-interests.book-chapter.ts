import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const specialInterests = {
  id: "01a06593-c4ee-7014-8e8d-716857fb0afb",
  pageTypeSlug: "book-chapter",
  slug: "special-interests",
  title: "Special interests",
  description:
    'Special interests — sustained deep interests via "same context, novel content"; the autism × ADHD intersection.',
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
