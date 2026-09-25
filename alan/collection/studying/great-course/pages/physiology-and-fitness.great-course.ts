import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const physiologyAndFitness = {
  id: "019db533-f3a0-77b1-9ae8-3b22ca32c20a",
  type: "page-type/great-course",
  slug: "physiology-and-fitness",
  title: "Physiology and Fitness",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 1130.4,
  ownProgress: 345.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "physiology-and-fitness",
      externalLink: "https://www.thegreatcoursesplus.com/physiology-and-fitness",
    },
  ],
} as const satisfies GreatCourse
