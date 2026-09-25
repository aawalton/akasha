import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const creativityAndYourBrain = {
  id: "019db533-f39e-761f-9a1c-ab0e940aaa4c",
  type: "page-type/great-course",
  slug: "creativity-and-your-brain",
  title: "Creativity and Your Brain",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 599.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "creativity-and-your-brain",
      externalLink: "https://www.thegreatcoursesplus.com/creativity-and-your-brain",
    },
  ],
} as const satisfies GreatCourse
