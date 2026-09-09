import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const vehicles = {
  id: "01a06594-c68d-7009-a047-54f198e92b0a",
  pageTypeSlug: "book-section",
  slug: "vehicles",
  title: "Two Electric Vehicles",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "Two long-range BEVs — annual miles, mi/kWh efficiency by model, charging losses, cold-weather penalty, Level 2 charging peak draw, scheduling implications.",
  partOfCollections: ["book-section/solar-power/energy-demand"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
