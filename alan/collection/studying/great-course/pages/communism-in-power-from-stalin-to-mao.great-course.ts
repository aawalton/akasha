import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const communismInPowerFromStalinToMao = {
  id: "019db533-f3a0-753f-82b2-0b08922096bf",
  type: "page-type/great-course",
  slug: "communism-in-power-from-stalin-to-mao",
  title: "Communism in Power: From Stalin to Mao",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 354,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "communism-in-power-from-stalin-to-mao",
      externalLink: "https://www.thegreatcoursesplus.com/communism-in-power-from-stalin-to-mao",
    },
  ],
} as const satisfies GreatCourse
