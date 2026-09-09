import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const pv = {
  id: "01a06594-c68e-7009-a59b-6648b4222722",
  pageTypeSlug: "book-section",
  slug: "pv",
  title: "PV Sizing for Annual Net-Zero",
  sectionOf: "book-section/solar-power/sizing",
  description:
    "PV DC kWp sizing — Provo specific yield, real-roof derate stack, ILR, mid-life degradation; demand × yield sensitivity table; roof-area feasibility.",
  partOfCollections: ["book-section/solar-power/sizing"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
