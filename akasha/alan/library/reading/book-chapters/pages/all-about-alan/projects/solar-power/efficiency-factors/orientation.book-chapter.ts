import type { BookChapter } from "../../../../../book-chapter.page-type.ts"

export const orientation = {
  id: "01a06594-c68d-7000-93cd-e9cc6c9b6e20",
  pageTypeSlug: "book-chapter",
  slug: "orientation",
  title: "Tilt and Azimuth (POA Irradiance)",
  description:
    "Plane-of-array (POA) irradiance — converting GHI to what actually hits the panel. Tilt, azimuth, and combined derate tables for Provo.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
