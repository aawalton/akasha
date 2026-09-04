import type { BookChapter } from "../../../../library/reading/book-chapters/book-chapter.page-type.ts"

export const thermoregulation = {
  id: "01a06594-c685-7003-86ad-13a169700e75",
  pageTypeSlug: "book-chapter",
  slug: "thermoregulation",
  title: "Thermoregulation",
  description:
    "Body-temperature regulation — internal temperature tracks the safety level rather than ambient, with directional inversion (hot at high safety, cold at low) and an output-side production failure.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
