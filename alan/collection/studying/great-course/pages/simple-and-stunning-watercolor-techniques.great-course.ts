import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const simpleAndStunningWatercolorTechniques = {
  id: "019db533-f39f-742f-bcba-efa202013736",
  type: "page-type/great-course",
  slug: "simple-and-stunning-watercolor-techniques",
  title: "Simple and Stunning Watercolor Techniques",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 151.8,
  ownProgress: 151.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "simple-and-stunning-watercolor-techniques",
      externalLink: "https://www.thegreatcoursesplus.com/simple-and-stunning-watercolor-techniques",
    },
  ],
} as const satisfies GreatCourse
