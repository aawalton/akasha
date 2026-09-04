import type { BookChapter } from "../../../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const losses = {
  id: "01a06594-c68c-700f-b2ce-5ee4e44631dc",
  pageTypeSlug: "book-chapter",
  slug: "losses",
  title: "System Losses",
  description:
    "System losses — shading, soiling, snow, temperature, mismatch, wiring, inverter, availability. The PVWatts 14.08% bucket and what's in it.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
