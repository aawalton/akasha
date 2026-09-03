import type { GreatCourse } from "../../great-course.page-type.ts"

export const scienceAndReligion = {
  id: "019db533-f39f-701f-a70b-8c32c1c738f9",
  pageTypeSlug: "great-course",
  slug: "science-and-religion",
  title: "Science and Religion",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 374.4,
  ownProgress: 0,
  partOfSlugs: [
    "all-great-courses",
    "philosophy-and-religion-great-courses",
    "science-great-courses",
  ],
  source: "the-great-courses",
  externalId: "science-and-religion",
  externalLink: "https://www.thegreatcoursesplus.com/science-and-religion",
} as const satisfies GreatCourse
