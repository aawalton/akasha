import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const specialInterests = {
  id: "01a06594-c684-7009-ba22-b17757fb0afb",
  pageTypeSlug: "book-chapter",
  slug: "special-interests",
  title: "Special interests",
  description:
    'Special interests — sustained deep interests via "same context, novel content"; the autism × ADHD intersection.',
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
