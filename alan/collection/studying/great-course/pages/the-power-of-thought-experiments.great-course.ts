import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thePowerOfThoughtExperiments = {
  id: "019db533-f39e-7b57-9173-73091a81f4cc",
  type: "page-type/great-course",
  slug: "the-power-of-thought-experiments",
  title: "The Power of Thought Experiments",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 714,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-power-of-thought-experiments",
      externalLink: "https://plus.thegreatcourses.com/the-power-of-thought-experiments",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
