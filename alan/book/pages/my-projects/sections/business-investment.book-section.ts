import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const businessInvestment = {
  id: "01a06594-c68b-700e-a26e-d13e33e94522",
  type: "page-type/book-section",
  slug: "business-investment",
  title: "Business Investment",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia business/investment residency paths: the BIIP (incl. Significant Investor Visa) closure of 31 Jul 2024 and what replaced it (May 2026 snapshot).",
  partOfCollections: [
    "book-section/other-residency/other-residency-australia",
    "alan-book/my-projects",
  ],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.107Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
