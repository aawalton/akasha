import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const sequence = {
  id: "01a06594-c68d-7011-aa5b-8bedc1093183",
  type: "book-section",
  slug: "sequence",
  title: "Recommended Sequence",
  sectionOf: "book-section/solar-power/envelope",
  description:
    "Recommended project sequence for a 1970s 6000 sq ft Provo house — audit, retrofit, post-retrofit verification, then parallel heat pump and PV.",
  partOfCollections: ["book-section/solar-power/envelope", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
