import type { BookSection } from "../../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const euResidencyLatvia = {
  id: "01a06594-c68a-7000-850d-54662590e04a",
  pageTypeSlug: "book-section",
  slug: "eu-residency-latvia",
  title: "Latvia",
  description:
    "Latvia residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/latvia.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
