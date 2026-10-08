import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const baseline = {
  id: "01a06594-c68d-700d-b4f4-61dd22a4489c",
  type: "page-type/book-section",
  slug: "baseline",
  title: "1970s Utah House — Envelope Baseline",
  sectionOf: "book-section/solar-power/envelope",
  description:
    "Typical envelope characteristics of a 1970s Utah house — assemblies, R-values, air leakage, ductwork — that set the starting heating load.",
  partOfCollections: ["book-section/solar-power/envelope", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.109Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
