import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const automaticitySystems = {
  id: "01a06594-c675-7008-a35b-e6ddcd306013",
  pageTypeSlug: "book-section",
  slug: "automaticity-systems",
  title: "Automaticity systems",
  sectionOf: "all-about-alan",
  description:
    'Automaticity in Alan\'s brain — five distinct routes to "becoming automatic", three reduced and two intact.',
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
