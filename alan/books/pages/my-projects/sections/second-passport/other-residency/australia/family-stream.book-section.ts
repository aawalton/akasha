import type { BookSection } from "../../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const familyStream = {
  id: "01a06594-c68b-700f-8e82-f7182a126e4d",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "family-stream",
  title: "Family Stream",
  sectionOf: "book-section/other-residency/other-residency-australia",
  description:
    "Australia family-stream residency paths: partner (309/100, 820/801), parent (103/143/864), and other family visas with current backlogs (May 2026 snapshot).",
  partOfCollections: ["book-section/other-residency/other-residency-australia", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
