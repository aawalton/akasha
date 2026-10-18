import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const quickAndEasyComfortFoods = {
  id: "019db533-f38a-7579-b736-22e3b5ada003",
  type: "page-type/great-course",
  slug: "quick-and-easy-comfort-foods",
  title: "Quick and Easy Comfort Foods",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 80,
  ownProgress: 80,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "quick-and-easy-comfort-foods",
      externalLink: "https://plus.thegreatcourses.com/quick-and-easy-comfort-foods",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
