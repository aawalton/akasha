import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const neurohackItUsingNeuroscienceForBetterLiving = {
  id: "01a06578-6719-7003-992f-9eaa2540c43a",
  type: "page-type/great-course",
  slug: "neurohack-it-using-neuroscience-for-better-living",
  title: "Neurohack It: Using Neuroscience for Better Living",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "neurohack-it-using-neuroscience-for-better-living",
      externalLink:
        "https://plus.thegreatcourses.com/neurohack-it-using-neuroscience-for-better-living",
    },
  ],
} as const satisfies GreatCourse
