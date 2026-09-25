import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lawSchoolForEveryoneCorporateLaw = {
  id: "019db533-f39e-7888-84b2-b1c168a1ff8a",
  type: "page-type/great-course",
  slug: "law-school-for-everyone-corporate-law",
  title: "Law School for Everyone: Corporate Law",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 348,
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
      externalId: "law-school-for-everyone-corporate-law",
      externalLink: "https://www.thegreatcoursesplus.com/law-school-for-everyone-corporate-law",
    },
  ],
} as const satisfies GreatCourse
