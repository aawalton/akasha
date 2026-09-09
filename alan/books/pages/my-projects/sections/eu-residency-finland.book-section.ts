import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.ts"

export const euResidencyFinland = {
  id: "01a06594-c689-700d-8808-9821a33c3e3b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-finland",
  title: "Finland",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Finland residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/finland.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
