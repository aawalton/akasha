import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingYourInnerGenius = {
  id: "019db533-f39e-7b47-9ae4-ee10a9865434",
  type: "page-type/great-course",
  slug: "understanding-your-inner-genius",
  title: "Understanding Your Inner Genius",
  status: "completed",
  unit: "unit/minutes",
  ownLength: 186,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-your-inner-genius",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-your-inner-genius",
    },
  ],
} as const satisfies GreatCourse
