import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thePowerOfMathematicalVisualization = {
  id: "019db533-f3a0-7649-87e1-c3e9dc8049fd",
  type: "page-type/great-course",
  slug: "the-power-of-mathematical-visualization",
  title: "The Power of Mathematical Visualization",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 741.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-power-of-mathematical-visualization",
      externalLink: "https://www.thegreatcoursesplus.com/the-power-of-mathematical-visualization",
    },
  ],
} as const satisfies GreatCourse
