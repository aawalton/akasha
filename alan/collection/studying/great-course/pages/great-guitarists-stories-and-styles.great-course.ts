import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatGuitaristsStoriesAndStyles = {
  id: "019db533-f3a0-7509-9cbe-284bda0a0cf4",
  type: "page-type/great-course",
  slug: "great-guitarists-stories-and-styles",
  title: "Great Guitarists' Stories and Styles",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 153,
  ownProgress: 153,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-guitarists-stories-and-styles",
      externalLink: "https://plus.thegreatcourses.com/great-guitarists-stories-and-styles",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
