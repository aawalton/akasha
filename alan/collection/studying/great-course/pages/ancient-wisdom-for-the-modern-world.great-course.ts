import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const ancientWisdomForTheModernWorld = {
  id: "019db533-f3a0-79b8-baa7-27d8e45a1d51",
  type: "page-type/great-course",
  slug: "ancient-wisdom-for-the-modern-world",
  title: "Ancient Wisdom for the Modern World",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 205.2,
  ownProgress: 205.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "ancient-wisdom-for-the-modern-world",
      externalLink: "https://www.thegreatcoursesplus.com/ancient-wisdom-for-the-modern-world",
    },
  ],
} as const satisfies GreatCourse
