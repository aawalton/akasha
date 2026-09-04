import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const hvac = {
  id: "01a06594-c68d-7005-8efb-da504a454ad7",
  pageTypeSlug: "book-chapter",
  slug: "hvac",
  title: "Space Heating + Cooling (Heat Pump)",
  description:
    "Heat pump space heating and cooling demand for a 6000 sq ft Provo home — heat-loss math, COP-vs-outdoor-temp integration, well-insulated vs. existing-house cases.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
