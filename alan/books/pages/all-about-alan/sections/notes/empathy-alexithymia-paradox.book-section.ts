import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.types.ts"

export const empathyAlexithymiaParadox = {
  id: "01a06594-c678-7001-a228-648a3d457a9b",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "empathy-alexithymia-paradox",
  title: "Empathy + alexithymia paradox",
  sectionOf: "all-about-alan",
  description:
    "Empathy + alexithymia paradox — increased in-moment empathy alongside total emotional alexithymia; resolved via in-moment perception vs. recall/imagination.",
  partOfCollections: ["all-about-alan", "book-section/all-about-alan/notes"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
