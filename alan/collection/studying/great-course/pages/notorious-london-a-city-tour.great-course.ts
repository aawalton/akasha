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
      externalLink: "https://plus.thegreatcourses.com/notorious-london-a-city-tour",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
