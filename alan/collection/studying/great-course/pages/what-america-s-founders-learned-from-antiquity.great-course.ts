import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const whatAmericaSFoundersLearnedFromAntiquity = {
  id: "019db533-f39f-763f-8ccc-a620962166fa",
  type: "page-type/great-course",
  slug: "what-america-s-founders-learned-from-antiquity",
  title: "What America’s Founders Learned from Antiquity",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 781.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "what-america-s-founders-learned-from-antiquity",
      externalLink:
        "https://www.thegreatcoursesplus.com/what-america-s-founders-learned-from-antiquity",
    },
  ],
} as const satisfies GreatCourse
