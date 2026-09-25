import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const makeYourOwnWireworkFindings = {
  id: "019db533-f39e-7565-8684-fd23bc877cbb",
  type: "page-type/great-course",
  slug: "make-your-own-wirework-findings",
  title: "Make Your Own Wirework Findings",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 230.4,
  ownProgress: 230.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "make-your-own-wirework-findings",
      externalLink: "https://www.thegreatcoursesplus.com/make-your-own-wirework-findings",
    },
  ],
} as const satisfies GreatCourse
