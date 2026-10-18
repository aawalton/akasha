import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToSurviveInSpace = {
  id: "019db533-f39e-7ef8-8b9a-c0dba0934f52",
  type: "page-type/great-course",
  slug: "how-to-survive-in-space",
  title: "How to Survive in Space",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 351,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-survive-in-space",
      externalLink: "https://plus.thegreatcourses.com/how-to-survive-in-space",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
