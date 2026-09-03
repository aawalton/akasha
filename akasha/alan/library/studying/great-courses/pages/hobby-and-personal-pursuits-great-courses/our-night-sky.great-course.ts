import type { GreatCourse } from "../../great-course.page-type.ts"

export const ourNightSky = {
  id: "019db533-f39e-7f18-b336-ff4805234624",
  pageTypeSlug: "great-course",
  slug: "our-night-sky",
  title: "Our Night Sky",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 386.4,
  ownProgress: 386.4,
  partOfSlugs: [
    "all-great-courses",
    "hobby-and-personal-pursuits-great-courses",
    "learning-paths-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "our-night-sky",
  externalLink: "https://www.thegreatcoursesplus.com/our-night-sky",
} as const satisfies GreatCourse
