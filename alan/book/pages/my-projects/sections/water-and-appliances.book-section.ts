import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const waterAndAppliances = {
  id: "01a06594-c68d-700a-b663-386fa4f16d24",
  type: "page-type/book-section",
  slug: "water-and-appliances",
  title: "Domestic Hot Water + Appliances",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "Domestic hot water, induction range, refrigeration, dryer, dishwasher, and miscellaneous kitchen appliances — annual kWh, peak draw, HPWH vs resistance tradeoff.",
  partOfCollections: ["book-section/solar-power/energy-demand", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
