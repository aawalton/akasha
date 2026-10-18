import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aLiteraryTourOfTheUnitedStates = {
  id: "019db533-f39e-77d3-a6ae-c909aa8e5a7a",
  type: "page-type/great-course",
  slug: "a-literary-tour-of-the-united-states",
  title: "A Literary Tour of the United States",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 672.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-literary-tour-of-the-united-states",
      externalLink: "https://plus.thegreatcourses.com/a-literary-tour-of-the-united-states",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
