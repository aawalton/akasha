import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const ourNightSky = {
  id: "019db533-f39e-7f18-b336-ff4805234624",
  type: "page-type/great-course",
  slug: "our-night-sky",
  title: "Our Night Sky",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 386.4,
  ownProgress: 386.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "our-night-sky",
      externalLink: "https://plus.thegreatcourses.com/our-night-sky",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
