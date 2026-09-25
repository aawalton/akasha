import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const qiGongForBetterHealthAndWellness = {
  id: "019db533-f3a0-7890-8fdb-674d5dfb657d",
  type: "page-type/great-course",
  slug: "qi-gong-for-better-health-and-wellness",
  title: "Qi Gong for Better Health and Wellness",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 505.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "qi-gong-for-better-health-and-wellness",
      externalLink: "https://www.thegreatcoursesplus.com/qi-gong-for-better-health-and-wellness",
    },
  ],
} as const satisfies GreatCourse
