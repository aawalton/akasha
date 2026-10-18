import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const eatForYourHealthSimpleScienceAndFantasticFlavor = {
  id: "019db533-f39f-7a48-b0b7-ce87f9ccb2fd",
  type: "page-type/great-course",
  slug: "eat-for-your-health-simple-science-and-fantastic-flavor",
  title: "Eat for Your Health: Simple Science and Fantastic Flavor",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 420,
  ownProgress: 420,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "eat-for-your-health-simple-science-and-fantastic-flavor",
      externalLink:
        "https://plus.thegreatcourses.com/eat-for-your-health-simple-science-and-fantastic-flavor",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
