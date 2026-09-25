import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lawSchoolForEveryoneLegislationAndRegulation = {
  id: "019db533-f39e-78a7-b118-1881574e0cc6",
  type: "page-type/great-course",
  slug: "law-school-for-everyone-legislation-and-regulation",
  title: "Law School for Everyone: Legislation and Regulation",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 376.8,
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
      externalId: "law-school-for-everyone-legislation-and-regulation",
      externalLink:
        "https://www.thegreatcoursesplus.com/law-school-for-everyone-legislation-and-regulation",
    },
  ],
} as const satisfies GreatCourse
