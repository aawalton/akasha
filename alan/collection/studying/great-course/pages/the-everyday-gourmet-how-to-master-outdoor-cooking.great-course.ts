import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGourmetHowToMasterOutdoorCooking = {
  id: "019db533-f39f-7913-b09b-1fc0c32a7474",
  type: "page-type/great-course",
  slug: "the-everyday-gourmet-how-to-master-outdoor-cooking",
  title: "The Everyday Gourmet: How to Master Outdoor Cooking",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 400.2,
  ownProgress: 400.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-gourmet-how-to-master-outdoor-cooking",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-everyday-gourmet-how-to-master-outdoor-cooking",
    },
  ],
} as const satisfies GreatCourse
