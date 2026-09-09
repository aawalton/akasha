import type { BookSection } from "../../../../../library/reading/book-sections/book-section.page-type.ts"

export const medicalSocialIsolation = {
  id: "01a06594-c67b-7005-89cd-f098e3f70066",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "medical-social-isolation",
  title: "Medical social isolation",
  sectionOf: "all-about-alan",
  description:
    "Medical social isolation — the year-long, framed-as-medical cut to family-minimum-plus-church, the calling as a misclassification, and how it composes with the rest of the recovery stack.",
  partOfCollections: ["all-about-alan"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
