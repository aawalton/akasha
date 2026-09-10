import type { BookSection } from "../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const battery = {
  id: "01a06594-c68e-7006-942e-d347a34aa85e",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "battery",
  title: "Battery Sizing",
  sectionOf: "book-section/solar-power/sizing",
  description:
    "Battery sizing — daily PV-to-evening shifting plus short-duration outage resilience. Seasonal storage role is held by the grid; battery is not a seasonal asset.",
  partOfCollections: ["book-section/solar-power/sizing", "my-projects"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
