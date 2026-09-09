import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const selfSufficiency = {
  id: "01a06594-c68d-7007-bd5c-3bc121fc6d03",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "self-sufficiency",
  title: "Self-Sufficiency Implications",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "Self-sufficiency analysis — battery autonomy math, winter shortfall problem, generator vs oversize-PV tradeoff, load-shedding hierarchy for the Provo all-electric home.",
  partOfCollections: ["book-section/solar-power/energy-demand", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
