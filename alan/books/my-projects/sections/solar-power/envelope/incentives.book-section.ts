import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const incentives = {
  id: "01a06594-c68d-700e-8510-f9f4dc8ee80a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "incentives",
  title: "Incentives and Utah Contractors",
  sectionOf: "book-section/solar-power/envelope",
  description:
    "Current envelope-retrofit incentives in Utah (May 2026) — federal 25C dead, Utah HOMES/HEAR pending, Rocky Mountain Power Wattsmart live — plus local contractor leads.",
  partOfCollections: ["book-section/solar-power/envelope"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
