import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const solarPower = {
  id: "01a076ee-ecd3-735d-8f62-ba763d3bcbc1",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "solar-power",
  title: "Solar Power",
  sectionOf: "my-projects",
  description:
    "Putting photovoltaic generation on the Provo house, and the envelope work that sets how much generation the house needs. The sections beneath hold the scope, the demand the system is sized against, the sizing itself, the pricing, the installers, and the interconnection the design must fit.",
  partOfCollections: ["my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
