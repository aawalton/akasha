import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const nationalGeographicPolarExplorations = {
  id: "019db533-f39f-74c3-94a7-e1920a323c37",
  type: "page-type/great-course",
  slug: "national-geographic-polar-explorations",
  title: "National Geographic Polar Explorations",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 669.6,
  ownProgress: 669.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "national-geographic-polar-explorations",
      externalLink: "https://www.thegreatcoursesplus.com/national-geographic-polar-explorations",
    },
  ],
} as const satisfies GreatCourse
