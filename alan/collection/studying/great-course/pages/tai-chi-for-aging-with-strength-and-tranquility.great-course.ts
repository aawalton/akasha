import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const taiChiForAgingWithStrengthAndTranquility = {
  id: "019db533-f3a0-763e-b4c9-2287f6f7d6ab",
  type: "page-type/great-course",
  slug: "tai-chi-for-aging-with-strength-and-tranquility",
  title: "Tai Chi for Aging with Strength and Tranquility",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 473.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "tai-chi-for-aging-with-strength-and-tranquility",
      externalLink:
        "https://www.thegreatcoursesplus.com/tai-chi-for-aging-with-strength-and-tranquility",
    },
  ],
} as const satisfies GreatCourse
