import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const interconnectedThePastPresentAndFutureOfTheInternet = {
  id: "019db533-f39f-7269-99b4-5c41f62f524b",
  type: "page-type/great-course",
  slug: "interconnected-the-past-present-and-future-of-the-internet",
  title: "Interconnected: The Past, Present, and Future of the Internet",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 108,
  ownProgress: 108,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "interconnected-the-past-present-and-future-of-the-internet",
      externalLink:
        "https://www.thegreatcoursesplus.com/interconnected-the-past-present-and-future-of-the-internet",
    },
  ],
} as const satisfies GreatCourse
