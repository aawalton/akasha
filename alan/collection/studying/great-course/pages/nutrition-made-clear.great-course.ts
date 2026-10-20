import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const nutritionMadeClear = {
  id: "019db533-f3a0-77bc-a3b7-a62b47a8af1d",
  type: "page-type/great-course",
  slug: "nutrition-made-clear",
  title: "Nutrition Made Clear",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 1114.87,
  ownProgress: 491.87,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "lectures-and-courses-on-nutrition-understanding-nutrition",
      externalLink:
        "https://plus.thegreatcourses.com/lectures-and-courses-on-nutrition-understanding-nutrition",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-20T14:18:41.033Z",
  progressedAt: "2026-10-20T14:18:41.033Z",
} as const satisfies GreatCourse
