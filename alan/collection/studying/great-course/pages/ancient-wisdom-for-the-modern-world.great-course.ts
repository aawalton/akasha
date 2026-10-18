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
      externalLink: "https://plus.thegreatcourses.com/ancient-wisdom-for-the-modern-world",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
