import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const battery = {
  id: "01a06594-c68e-7006-942e-d347a34aa85e",
  type: "page-type/book-section",
  slug: "battery",
  title: "Battery Sizing",
  sectionOf: "book-section/solar-power/sizing",
  description:
    "Battery sizing — daily PV-to-evening shifting plus short-duration outage resilience, priced as an optional line of its own rather than part of the PV case.",
  partOfCollections: ["book-section/solar-power/sizing", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
