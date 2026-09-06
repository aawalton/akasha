import type { BookSection } from "../../../../../library/reading/book-chapters/book-section.page-type.ts"

export const otherResidencyAndorra = {
  id: "01a06594-c68b-700c-a509-4b098cfce606",
  pageTypeSlug: "book-section",
  slug: "other-residency-andorra",
  title: "Andorra",
  description: "Andorra residency paths (May 2026 snapshot).",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookSection
