import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whiteCollarCriminalLawExplained = {
  id: "019db533-f39e-72f1-84a4-5d34fc169207",
  type: "page-type/great-course",
  slug: "white-collar-criminal-law-explained",
  title: "White Collar Criminal Law Explained",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 745.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "white-collar-criminal-law-eplained",
      externalLink: "https://www.thegreatcoursesplus.com/white-collar-criminal-law-eplained",
    },
  ],
} as const satisfies GreatCourse
