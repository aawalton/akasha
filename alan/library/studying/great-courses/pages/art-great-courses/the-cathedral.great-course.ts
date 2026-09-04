import type { GreatCourse } from "../../great-course.page-type.ts"

export const theCathedral = {
  id: "019db533-f3a0-7126-a45b-0efc0fe2476e",
  pageTypeSlug: "great-course",
  slug: "the-cathedral",
  title: "The Cathedral",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 739.8,
  ownProgress: 739.8,
  partOfSlugs: [
    "all-great-courses",
    "art-great-courses",
    "history-great-courses",
    "philosophy-and-religion-great-courses",
    "science-great-courses",
    "travel-and-culture-great-courses",
  ],
  source: "the-great-courses",
  externalId: "the-cathedral",
  externalLink: "https://www.thegreatcoursesplus.com/the-cathedral",
} as const satisfies GreatCourse
