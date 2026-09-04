import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const automaticitySystems = {
  id: "01a06594-c675-7008-a35b-e6ddcd306013",
  pageTypeSlug: "book-chapter",
  slug: "automaticity-systems",
  title: "Automaticity systems",
  description:
    'Automaticity in Alan\'s brain — five distinct routes to "becoming automatic", three reduced and two intact.',
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
