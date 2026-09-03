import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const sizing = {
  id: "01a06594-c68e-700c-9a9c-c6e3f9ee0198",
  pageTypeSlug: "book-chapter",
  slug: "sizing",
  title: "Sizing",
  description:
    "Annual net-zero sizing math for the solar power project — PV, battery, inverter, service panel, roof area, and cost stack with one planning-case recommendation.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
