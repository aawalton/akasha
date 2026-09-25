import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aBrandCalledYou = {
  id: "019db533-f39e-72f9-9792-73a20df2e75c",
  type: "page-type/great-course",
  slug: "a-brand-called-you",
  title: "A Brand Called You",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 287.4,
  ownProgress: 287.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-brand-called-you",
      externalLink: "https://www.thegreatcoursesplus.com/a-brand-called-you",
    },
  ],
} as const satisfies GreatCourse
