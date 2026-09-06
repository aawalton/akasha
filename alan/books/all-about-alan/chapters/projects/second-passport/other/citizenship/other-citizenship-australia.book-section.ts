import type { BookSection } from "../../../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherCitizenshipAustralia = {
  id: "01a06594-c68a-700e-8492-91d7ac2ae20d",
  pageTypeSlug: "book-section",
  slug: "other-citizenship-australia",
  title: "Australia",
  description:
    "Australia citizenship paths (May 2026 snapshot). For residency paths, see ../residency/australia.md.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
