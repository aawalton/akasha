import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const math = {
  id: "01a06594-c68d-700f-bfe9-858870eb06bd",
  pageTypeSlug: "book-chapter",
  slug: "math",
  title: "Heating-Load Reduction → PV Sizing Math",
  description:
    "Heating-load-reduction math — retrofit % → kWh/yr saved → PV kWp removed → dollars. Compares envelope-first, solar-first, and parallel orderings.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
