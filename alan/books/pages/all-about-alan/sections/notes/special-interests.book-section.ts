import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const specialInterests = {
  id: "01a06594-c684-7009-ba22-b17757fb0afb",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "special-interests",
  title: "Special interests",
  sectionOf: "all-about-alan",
  description:
    'Special interests — sustained deep interests via "same context, novel content"; the autism × ADHD intersection.',
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
