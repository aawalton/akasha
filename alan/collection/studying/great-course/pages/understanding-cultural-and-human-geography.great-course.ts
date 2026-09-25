import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingCulturalAndHumanGeography = {
  id: "019db533-f39f-7b68-9cbb-2e418c525660",
  type: "page-type/great-course",
  slug: "understanding-cultural-and-human-geography",
  title: "Understanding Cultural and Human Geography",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 733.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-cultural-and-human-geography",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-cultural-and-human-geography",
    },
  ],
} as const satisfies GreatCourse
