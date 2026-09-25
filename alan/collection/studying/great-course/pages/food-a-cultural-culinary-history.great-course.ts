import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const foodACulturalCulinaryHistory = {
  id: "019db533-f3a0-75ca-941d-ea6475ccc240",
  type: "page-type/great-course",
  slug: "food-a-cultural-culinary-history",
  title: "Food: A Cultural Culinary History",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1114.2,
  ownProgress: 1114.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "food-a-cultural-culinary-history",
      externalLink: "https://www.thegreatcoursesplus.com/food-a-cultural-culinary-history",
    },
  ],
} as const satisfies GreatCourse
