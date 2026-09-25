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
      externalLink: "https://www.thegreatcoursesplus.com/the-power-of-thought-experiments",
    },
  ],
} as const satisfies GreatCourse
