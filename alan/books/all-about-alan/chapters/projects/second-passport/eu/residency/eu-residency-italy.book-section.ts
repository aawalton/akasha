import type { BookSection } from "../../../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyItaly = {
  id: "01a06594-c689-7013-bd93-592af33a65fb",
  pageTypeSlug: "book-section",
  slug: "eu-residency-italy",
  title: "Italy",
  description:
    "Italy residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/italy.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
