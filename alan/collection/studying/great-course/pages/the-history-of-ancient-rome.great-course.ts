import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoryOfAncientRome = {
  id: "019db533-f39f-7cfb-b94a-f4ebdea69829",
  type: "page-type/great-course",
  slug: "the-history-of-ancient-rome",
  title: "The History of Ancient Rome",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1451.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-history-of-ancient-rome",
      externalLink: "https://www.thegreatcoursesplus.com/the-history-of-ancient-rome",
    },
  ],
} as const satisfies GreatCourse
