import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mindfulPhotography = {
  id: "019db533-f39e-7584-a966-0efe6ba8c543",
  type: "page-type/great-course",
  slug: "mindful-photography",
  title: "Mindful Photography",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 348.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mindful-photography",
      externalLink: "https://www.thegreatcoursesplus.com/mindful-photography",
    },
  ],
} as const satisfies GreatCourse
