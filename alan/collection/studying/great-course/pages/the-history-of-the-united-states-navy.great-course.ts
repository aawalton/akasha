import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theHistoryOfTheUnitedStatesNavy = {
  id: "019db533-f39f-7cf0-b1b7-2fe32ba5ef5f",
  type: "page-type/great-course",
  slug: "the-history-of-the-united-states-navy",
  title: "The History of the United States Navy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 763.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-history-of-the-united-states-navy",
      externalLink: "https://www.thegreatcoursesplus.com/the-history-of-the-united-states-navy",
    },
  ],
} as const satisfies GreatCourse
