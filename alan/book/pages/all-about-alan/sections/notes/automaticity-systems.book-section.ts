import type { BookSection } from "akasha/alan/library/reading/book-section/book-section.page-type.types.ts"

export const automaticitySystems = {
  id: "01a06594-c675-7008-a35b-e6ddcd306013",
  type: "page-type/book-section",
  slug: "automaticity-systems",
  title: "Automaticity systems",
  sectionOf: "alan-book/all-about-alan",
  description:
    'Automaticity in Alan\'s brain — five distinct routes to "becoming automatic", three reduced and two intact.',
  partOfCollections: ["alan-book/all-about-alan", "book-section/all-about-alan/notes"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
