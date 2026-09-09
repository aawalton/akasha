import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const cost = {
  id: "01a06594-c68e-7007-a401-a52e234c9ad2",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "cost",
  title: "Total Cost Stack",
  sectionOf: "book-section/solar-power/sizing",
  description:
    "Total cost stack — PV + battery + service panel + EV chargers, pre-ITC and post-ITC, three demand scenarios. ITC status uncertainty called out.",
  partOfCollections: ["book-section/solar-power/sizing"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
