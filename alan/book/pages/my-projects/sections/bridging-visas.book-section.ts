import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const bridgingVisas = {
  id: "01a06594-c68b-700d-89a0-fef420d3cfbe",
  type: "page-type/book-section",
  slug: "bridging-visas",
  title: "Bridging Visas",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia bridging visas BVA–BVE: status-maintenance visas that hold lawful status while a substantive decision is pending (May 2026 snapshot).",
  partOfCollections: [
    "book-section/other-residency/other-residency-australia",
    "alan-book/my-projects",
  ],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.107Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
