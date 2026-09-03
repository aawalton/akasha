import type { GreatCourse } from "../../great-course.page-type.ts"

export const howToSing = {
  id: "019db533-f3a0-7383-858d-4d0584951414",
  pageTypeSlug: "great-course",
  slug: "how-to-sing",
  title: "How to Sing",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1117.2,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "music-great-courses",
  ],
  source: "the-great-courses",
  externalId: "how-to-sing",
  externalLink: "https://www.thegreatcoursesplus.com/how-to-sing",
} as const satisfies GreatCourse
