import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theInstantSommelierChoosingYourBestWine = {
  id: "019db533-f39f-77c7-9601-3019a7059515",
  type: "page-type/great-course",
  slug: "the-instant-sommelier-choosing-your-best-wine",
  title: "The Instant Sommelier: Choosing Your Best Wine",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 186,
  ownProgress: 186,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-instant-sommelier-choosing-your-best-wine",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-instant-sommelier-choosing-your-best-wine",
    },
  ],
} as const satisfies GreatCourse
