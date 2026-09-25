import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lawSchoolForEveryoneConstitutionalLaw = {
  id: "019db533-f3a0-7103-821d-8173b1ea651d",
  type: "page-type/great-course",
  slug: "law-school-for-everyone-constitutional-law",
  title: "Law School for Everyone: Constitutional Law",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 389.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "law-school-for-everyone-constitutional-law",
      externalLink:
        "https://www.thegreatcoursesplus.com/law-school-for-everyone-constitutional-law",
    },
  ],
} as const satisfies GreatCourse
