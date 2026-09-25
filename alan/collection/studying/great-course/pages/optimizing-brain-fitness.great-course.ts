import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const optimizingBrainFitness = {
  id: "019db533-f3a0-783b-b9a1-4aa5fd6b5d7a",
  type: "page-type/great-course",
  slug: "optimizing-brain-fitness",
  title: "Optimizing Brain Fitness",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 358.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/professional-growth-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "optimizing-brain-fitness",
      externalLink: "https://www.thegreatcoursesplus.com/optimizing-brain-fitness",
    },
  ],
} as const satisfies GreatCourse
