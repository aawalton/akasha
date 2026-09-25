import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const fittingSoloFromMeasurementsToMuslin = {
  id: "019db533-f39e-74ea-9348-5b2253beefc2",
  type: "page-type/great-course",
  slug: "fitting-solo-from-measurements-to-muslin",
  title: "Fitting Solo: From Measurements to Muslin",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 141.6,
  ownProgress: 141.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "fitting-solo-from-measurements-to-muslin",
      externalLink: "https://www.thegreatcoursesplus.com/fitting-solo-from-measurements-to-muslin",
    },
  ],
} as const satisfies GreatCourse
