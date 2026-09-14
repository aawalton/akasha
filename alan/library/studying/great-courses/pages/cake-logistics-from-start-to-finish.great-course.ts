import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const cakeLogisticsFromStartToFinish = {
  id: "019db533-f39f-7afe-a6f6-c54d7777f2bd",
  type: "great-course",
  slug: "cake-logistics-from-start-to-finish",
  title: "Cake Logistics From Start to Finish",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 97.8,
  ownProgress: 97.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "cake-logistics-from-start-to-finish",
      externalLink: "https://www.thegreatcoursesplus.com/cake-logistics-from-start-to-finish",
    },
  ],
} as const satisfies GreatCourse
