import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lawSchoolForEveryoneContracts = {
  id: "019db533-f39e-7821-af17-15e9b6099a1d",
  type: "page-type/great-course",
  slug: "law-school-for-everyone-contracts",
  title: "Law School for Everyone: Contracts",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 393.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "law-school-for-everyone-contracts",
      externalLink: "https://www.thegreatcoursesplus.com/law-school-for-everyone-contracts",
    },
  ],
} as const satisfies GreatCourse
