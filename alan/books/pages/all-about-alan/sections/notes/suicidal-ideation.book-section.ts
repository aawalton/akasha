import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const suicidalIdeation = {
  id: "01a06594-c685-7001-ab9a-81027250ae7a",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "suicidal-ideation",
  title: "Suicidal ideation",
  sectionOf: "all-about-alan",
  description:
    "Suicidal ideation — the lifelong arc, the age-7 first episode stopped by my own epistemic rigor, and survivors' stories (real and fictional) as the outside input that buys one more day.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
