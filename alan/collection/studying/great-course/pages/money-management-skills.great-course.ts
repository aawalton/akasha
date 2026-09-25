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
      externalLink: "https://www.thegreatcoursesplus.com/money-management-skills",
    },
  ],
} as const satisfies GreatCourse
