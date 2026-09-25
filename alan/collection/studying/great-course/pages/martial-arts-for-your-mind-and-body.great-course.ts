import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const martialArtsForYourMindAndBody = {
  id: "019db533-f3a0-79d8-b4c0-a7dc5cad1a5a",
  type: "page-type/great-course",
  slug: "martial-arts-for-your-mind-and-body",
  title: "Martial Arts for Your Mind and Body",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 768,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "martial-arts-for-your-mind-and-body",
      externalLink: "https://www.thegreatcoursesplus.com/martial-arts-for-your-mind-and-body",
    },
  ],
} as const satisfies GreatCourse
