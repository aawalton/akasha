import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGourmetTheJoyOfMediterraneanCooking = {
  id: "019db533-f39f-7968-8a79-66523448030c",
  type: "page-type/great-course",
  slug: "the-everyday-gourmet-the-joy-of-mediterranean-cooking",
  title: "The Everyday Gourmet: The Joy of Mediterranean Cooking",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 559.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-gourmet-the-joy-of-mediterranean-cooking",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-everyday-gourmet-the-joy-of-mediterranean-cooking",
    },
  ],
} as const satisfies GreatCourse
