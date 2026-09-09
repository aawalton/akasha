import type { BookSection } from "../../../../library/reading/book-chapters/book-section.page-type.ts"

export const thermoregulation = {
  id: "01a06594-c685-7003-86ad-13a169700e75",
  pageTypeSlug: "book-section",
  slug: "thermoregulation",
  title: "Thermoregulation",
  sectionOf: "all-about-alan",
  description:
    "Body-temperature regulation — internal temperature tracks the safety level rather than ambient, with directional inversion (hot at high safety, cold at low) and an output-side production failure.",
  partOfCollections: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
