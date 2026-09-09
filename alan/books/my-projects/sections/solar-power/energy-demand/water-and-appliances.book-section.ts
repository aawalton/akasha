import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const waterAndAppliances = {
  id: "01a06594-c68d-700a-b663-386fa4f16d24",
  pageTypeSlug: "book-section",
  slug: "water-and-appliances",
  title: "Domestic Hot Water + Appliances",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "Domestic hot water, induction range, refrigeration, dryer, dishwasher, and miscellaneous kitchen appliances — annual kWh, peak draw, HPWH vs resistance tradeoff.",
  partOfCollections: ["book-section/solar-power/energy-demand"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
