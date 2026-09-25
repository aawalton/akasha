import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const storiesOfAmericaSNationalParks = {
  id: "019db533-f39f-7464-b20c-30467266584f",
  type: "page-type/great-course",
  slug: "stories-of-america-s-national-parks",
  title: "Stories of America’s National Parks",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 355.2,
  ownProgress: 355.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "stories-of-america-s-national-parks",
      externalLink: "https://www.thegreatcoursesplus.com/stories-of-america-s-national-parks",
    },
  ],
} as const satisfies GreatCourse
