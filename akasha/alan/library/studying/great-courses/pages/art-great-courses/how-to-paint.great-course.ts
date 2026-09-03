import type { GreatCourse } from "../../great-course.page-type.ts"

export const howToPaint = {
  id: "019db533-f39f-760a-9c4e-c0c5006665d3",
  pageTypeSlug: "great-course",
  slug: "how-to-paint",
  title: "How to Paint",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 778.2,
  ownProgress: 778.2,
  partOfSlugs: [
    "all-great-courses",
    "art-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "how-to-paint",
  externalLink: "https://www.thegreatcoursesplus.com/how-to-paint",
} as const satisfies GreatCourse
