import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const baseline = {
  id: "01a06594-c68d-700d-b4f4-61dd22a4489c",
  pageTypeSlug: "book-section",
  slug: "baseline",
  title: "1970s Utah House — Envelope Baseline",
  sectionOf: "book-section/solar-power/envelope",
  description:
    "Typical envelope characteristics of a 1970s Utah house — assemblies, R-values, air leakage, ductwork — that set the starting heating load.",
  partOfCollections: ["book-section/solar-power/envelope"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
