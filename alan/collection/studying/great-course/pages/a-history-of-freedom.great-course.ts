import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aHistoryOfFreedom = {
  id: "019db533-f388-7086-b839-cec06334f3e6",
  type: "page-type/great-course",
  slug: "a-history-of-freedom",
  title: "A History of Freedom",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1100.1,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-history-of-freedom",
      externalLink: "https://www.thegreatcoursesplus.com/a-history-of-freedom",
    },
  ],
} as const satisfies GreatCourse
