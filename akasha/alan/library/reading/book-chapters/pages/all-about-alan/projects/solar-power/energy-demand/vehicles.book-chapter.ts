import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const vehicles = {
  id: "01a06594-c68d-7009-a047-54f198e92b0a",
  pageTypeSlug: "book-chapter",
  slug: "vehicles",
  title: "Two Electric Vehicles",
  description:
    "Two long-range BEVs — annual miles, mi/kWh efficiency by model, charging losses, cold-weather penalty, Level 2 charging peak draw, scheduling implications.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
