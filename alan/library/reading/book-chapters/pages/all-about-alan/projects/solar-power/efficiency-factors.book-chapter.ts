import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const efficiencyFactors = {
  id: "01a06594-c68d-7003-b765-d0f850b5a956",
  pageTypeSlug: "book-chapter",
  slug: "efficiency-factors",
  title: "Rooftop Solar Efficiency Factors (Provo, UT)",
  description:
    "Mechanical decomposition of rooftop solar efficiency factors — from atmospheric irradiance to AC power at the meter — calibrated for Provo, UT.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
