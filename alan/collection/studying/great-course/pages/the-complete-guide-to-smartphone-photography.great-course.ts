import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theCompleteGuideToSmartphonePhotography = {
  id: "019db533-f39e-76c3-9bd3-f6fe4fcae9eb",
  type: "page-type/great-course",
  slug: "the-complete-guide-to-smartphone-photography",
  title: "The Complete Guide to Smartphone Photography",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 444.6,
  ownProgress: 444.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-complete-guide-to-smartphone-photography",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-complete-guide-to-smartphone-photography",
    },
  ],
} as const satisfies GreatCourse
