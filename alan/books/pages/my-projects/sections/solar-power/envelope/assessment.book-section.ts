import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const assessment = {
  id: "01a06594-c68d-700c-9ddb-6b1adb48d132",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "assessment",
  title: "Envelope Assessment Options",
  sectionOf: "book-section/solar-power/envelope",
  description:
    "Assessment options for the envelope — blower door, IR thermography, Manual J, BPI / RESNET audits — with current pricing and what each one resolves.",
  partOfCollections: ["book-section/solar-power/envelope", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
