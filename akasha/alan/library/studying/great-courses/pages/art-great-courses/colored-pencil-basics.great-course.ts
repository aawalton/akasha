import type { GreatCourse } from "../../great-course.page-type.ts"

export const coloredPencilBasics = {
  id: "019db533-f39f-768b-9e18-92f7216f9b1d",
  pageTypeSlug: "great-course",
  slug: "colored-pencil-basics",
  title: "Colored Pencil Basics",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 643.2,
  ownProgress: 643.2,
  partOfSlugs: [
    "all-great-courses",
    "art-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "colored-pencil-basics",
  externalLink: "https://www.thegreatcoursesplus.com/colored-pencil-basics",
} as const satisfies GreatCourse
