import type { GreatCourse } from "../../great-course.page-type.ts"

export const greatCourse7DaysOfDrawing = {
  id: "019db533-f39f-7807-962a-19b34b4a4402",
  pageTypeSlug: "great-course",
  slug: "great-course-7-days-of-drawing",
  title: "7 Days of Drawing",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 94.2,
  ownProgress: 94.2,
  partOfSlugs: [
    "all-great-courses",
    "art-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "7-days-of-drawing",
  externalLink: "https://www.thegreatcoursesplus.com/7-days-of-drawing",
} as const satisfies GreatCourse
