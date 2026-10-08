import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const incentives = {
  id: "01a06594-c68d-700e-8510-f9f4dc8ee80a",
  type: "page-type/book-section",
  slug: "incentives",
  title: "Incentives and Utah Contractors",
  sectionOf: "book-section/solar-power/envelope",
  description:
    "Current envelope-retrofit incentives in Utah (May 2026) — federal 25C dead, Utah HOMES/HEAR pending, Rocky Mountain Power Wattsmart live — plus local contractor leads.",
  partOfCollections: ["book-section/solar-power/envelope", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.109Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
