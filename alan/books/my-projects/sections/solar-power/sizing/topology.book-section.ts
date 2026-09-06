import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const topology = {
  id: "01a06594-c68e-700b-ba2c-fede3797092d",
  pageTypeSlug: "book-section",
  slug: "topology",
  title: "Inverter Topology and Service-Panel Decision",
  description:
    "Inverter topology (microinverter vs string + optimizers vs hybrid string + battery) and service-panel decision (200 A + SPAN vs 400 A) for the 49 kWp + 40 kWh planning case.",
  partOfSlugs: ["sizing"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
