import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const vehicles = {
  id: "01a06594-c68d-7009-a047-54f198e92b0a",
  type: "page-type/book-section",
  slug: "vehicles",
  title: "Two Electric Vehicles",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "Two long-range BEVs — annual miles, mi/kWh efficiency by model, charging losses, cold-weather penalty, Level 2 charging peak draw, scheduling implications.",
  partOfCollections: ["book-section/solar-power/energy-demand", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
