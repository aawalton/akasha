import type { BookSection } from "../../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const businessInvestment = {
  id: "01a06594-c68b-700e-a26e-d13e33e94522",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "business-investment",
  title: "Business Investment",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia business/investment residency paths: the BIIP (incl. Significant Investor Visa) closure of 31 Jul 2024 and what replaced it (May 2026 snapshot).",
  partOfCollections: ["book-section/other-residency/other-residency-australia"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
