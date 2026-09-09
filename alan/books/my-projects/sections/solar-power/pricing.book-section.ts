import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const pricing = {
  id: "01a06594-c68e-7004-8c32-5c397a0ecb16",
  pageTypeSlug: "book-section",
  slug: "pricing",
  title: "Rooftop Solar Pricing",
  sectionOf: "book-section/my-projects/solar-power",
  description:
    "Rooftop solar pricing — component breakdown, levers, and cost-curve history for residential US (with Utah context).",
  partOfCollections: ["book-section/my-projects/solar-power"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
