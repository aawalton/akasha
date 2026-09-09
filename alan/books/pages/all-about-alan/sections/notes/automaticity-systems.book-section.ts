import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const automaticitySystems = {
  id: "01a06594-c675-7008-a35b-e6ddcd306013",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "automaticity-systems",
  title: "Automaticity systems",
  sectionOf: "all-about-alan",
  description:
    'Automaticity in Alan\'s brain — five distinct routes to "becoming automatic", three reduced and two intact.',
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
