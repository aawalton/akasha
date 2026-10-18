import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const cookingBasicsWhatEveryoneShouldKnow = {
  id: "019db533-f39f-79f3-8c84-e650cba5c7be",
  type: "page-type/great-course",
  slug: "cooking-basics-what-everyone-should-know",
  title: "Cooking Basics: What Everyone Should Know",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 789.6,
  ownProgress: 789.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "cooking-basics-what-everyone-should-know",
      externalLink: "https://plus.thegreatcourses.com/cooking-basics-what-everyone-should-know",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
