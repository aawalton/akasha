import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const solarPower = {
  id: "01a076ee-ecd3-735d-8f62-ba763d3bcbc1",
  type: "page-type/book-section",
  slug: "solar-power",
  title: "Solar Power",
  sectionOf: "alan-book/my-projects",
  description:
    "Putting photovoltaic generation on the Provo house, and the envelope work that sets how much generation the house needs. The sections beneath hold the scope, the demand the system is sized against, the sizing itself, the pricing, the installers, and the interconnection the design must fit.",
  partOfCollections: ["alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
