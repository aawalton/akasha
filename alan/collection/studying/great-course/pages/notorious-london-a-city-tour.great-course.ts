import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const notoriousLondonACityTour = {
  id: "019db533-f39f-7522-b547-f9091190f3c7",
  type: "page-type/great-course",
  slug: "notorious-london-a-city-tour",
  title: "Notorious London: A City Tour",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 361.8,
  ownProgress: 361.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "notorious-london-a-city-tour",
      externalLink: "https://www.thegreatcoursesplus.com/notorious-london-a-city-tour",
    },
  ],
} as const satisfies GreatCourse
