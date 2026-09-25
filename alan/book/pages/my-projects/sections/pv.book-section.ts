import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const pv = {
  id: "01a06594-c68e-7009-a59b-6648b4222722",
  type: "page-type/book-section",
  slug: "pv",
  title: "PV Sizing for Annual Net-Zero",
  sectionOf: "book-section/solar-power/sizing",
  description:
    "PV DC kWp sizing — Provo specific yield, real-roof derate stack, ILR, mid-life degradation; demand × yield sensitivity table; roof-area feasibility.",
  partOfCollections: ["book-section/solar-power/sizing", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
