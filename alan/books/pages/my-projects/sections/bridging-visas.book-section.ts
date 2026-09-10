import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const bridgingVisas = {
  id: "01a06594-c68b-700d-89a0-fef420d3cfbe",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "bridging-visas",
  title: "Bridging Visas",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia bridging visas BVA–BVE: status-maintenance visas that hold lawful status while a substantive decision is pending (May 2026 snapshot).",
  partOfCollections: ["book-section/other-residency/other-residency-australia", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
