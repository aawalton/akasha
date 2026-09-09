import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const euResidencySpain = {
  id: "01a06594-c68a-700a-8ebf-ffc96523aac2",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "eu-residency-spain",
  title: "Spain",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Spain residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/spain.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
