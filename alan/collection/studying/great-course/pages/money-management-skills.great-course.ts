import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const moneyManagementSkills = {
  id: "019db533-f39e-7464-8901-95231845290e",
  type: "page-type/great-course",
  slug: "money-management-skills",
  title: "Money Management Skills",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 370.8,
  ownProgress: 370.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "money-management-skills",
      externalLink: "https://plus.thegreatcourses.com/money-management-skills",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
