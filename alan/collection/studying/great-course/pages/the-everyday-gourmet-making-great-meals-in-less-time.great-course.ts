import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGourmetMakingGreatMealsInLessTime = {
  id: "019db533-f39f-791d-96c0-7f84cc880d43",
  type: "page-type/great-course",
  slug: "the-everyday-gourmet-making-great-meals-in-less-time",
  title: "The Everyday Gourmet: Making Great Meals in Less Time",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 198,
  ownProgress: 198,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-gourmet-making-great-meals-in-less-time",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-everyday-gourmet-making-great-meals-in-less-time",
    },
  ],
} as const satisfies GreatCourse
