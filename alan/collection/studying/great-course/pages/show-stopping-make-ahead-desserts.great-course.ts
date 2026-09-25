import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const showStoppingMakeAheadDesserts = {
  id: "019db533-f39f-795d-9f86-9f373c96f769",
  type: "page-type/great-course",
  slug: "show-stopping-make-ahead-desserts",
  title: "Show-Stopping Make-Ahead Desserts",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 175.8,
  ownProgress: 175.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "show-stopping-make-ahead-desserts",
      externalLink: "https://www.thegreatcoursesplus.com/show-stopping-make-ahead-desserts",
    },
  ],
} as const satisfies GreatCourse
