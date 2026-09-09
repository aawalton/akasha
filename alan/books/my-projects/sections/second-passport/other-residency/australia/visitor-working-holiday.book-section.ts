import type { BookSection } from "../../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const visitorWorkingHoliday = {
  id: "01a06594-c68b-7014-b557-e8cb5070c213",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "visitor-working-holiday",
  title: "Visitor Working Holiday",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia visitor and working-holiday options: Work and Holiday 462, Working Holiday 417, Visitor 600, and the digital-nomad gap (May 2026 snapshot).",
  partOfCollections: ["book-section/other-residency/other-residency-australia"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
