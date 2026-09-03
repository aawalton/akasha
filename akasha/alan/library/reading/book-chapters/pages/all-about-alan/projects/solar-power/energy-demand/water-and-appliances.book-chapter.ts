import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const waterAndAppliances = {
  id: "01a06594-c68d-700a-b663-386fa4f16d24",
  pageTypeSlug: "book-chapter",
  slug: "water-and-appliances",
  title: "Domestic Hot Water + Appliances",
  description:
    "Domestic hot water, induction range, refrigeration, dryer, dishwasher, and miscellaneous kitchen appliances — annual kWh, peak draw, HPWH vs resistance tradeoff.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
