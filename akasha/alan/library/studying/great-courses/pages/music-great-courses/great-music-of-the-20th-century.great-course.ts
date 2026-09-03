import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatMusicOfThe20thCentury = {
  id: "019db533-f3a0-737d-9ae6-b547a11065a9",
  pageTypeSlug: "great-course",
  slug: "great-music-of-the-20th-century",
  title: "Great Music of the 20th Century",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1091.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "music-great-courses"],
  source: "the-great-courses",
  externalId: "great-music-of-the-20th-century",
  externalLink: "https://www.thegreatcoursesplus.com/great-music-of-the-20th-century",
} as const satisfies GreatCourse
