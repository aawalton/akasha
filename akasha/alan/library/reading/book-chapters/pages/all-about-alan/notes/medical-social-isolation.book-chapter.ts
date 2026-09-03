import type { BookChapter } from "../../../book-chapter.page-type.ts"

export const medicalSocialIsolation = {
  id: "01a06594-c67b-7005-89cd-f098e3f70066",
  pageTypeSlug: "book-chapter",
  slug: "medical-social-isolation",
  title: "Medical social isolation",
  description:
    "Medical social isolation — the year-long, framed-as-medical cut to family-minimum-plus-church, the calling as a misclassification, and how it composes with the rest of the recovery stack.",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
