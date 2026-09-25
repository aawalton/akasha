import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const computers = {
  id: "01a06594-c68d-7004-b389-d504ed1464d2",
  type: "page-type/book-section",
  slug: "computers",
  title: "12 Gaming Computers",
  sectionOf: "book-section/solar-power/energy-demand",
  description:
    "12 high-end gaming PCs — per-system TDP breakdown, moderate vs heavy usage scenarios, annual kWh range, peak coincident draw, year-round flat profile.",
  partOfCollections: ["book-section/solar-power/energy-demand", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
} as const satisfies BookSection
