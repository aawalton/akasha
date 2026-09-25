import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thePowerOfStorytellingWithAriShapiro = {
  id: "019db533-f39e-727b-a036-d09af379923d",
  type: "page-type/great-course",
  slug: "the-power-of-storytelling-with-ari-shapiro",
  title: "The Power of Storytelling with Ari Shapiro",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 379.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-power-of-storytelling-with-ari-shapiro",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-power-of-storytelling-with-ari-shapiro",
    },
  ],
} as const satisfies GreatCourse
