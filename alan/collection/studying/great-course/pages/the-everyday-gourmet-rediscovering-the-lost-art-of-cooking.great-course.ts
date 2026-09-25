import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theEverydayGourmetRediscoveringTheLostArtOfCooking = {
  id: "019db533-f39f-7848-b087-aa3f45b0c24b",
  type: "page-type/great-course",
  slug: "the-everyday-gourmet-rediscovering-the-lost-art-of-cooking",
  title: "The Everyday Gourmet: Rediscovering the Lost Art of Cooking",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 850.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-everyday-gourmet-rediscovering-the-lost-art-of-cooking",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-everyday-gourmet-rediscovering-the-lost-art-of-cooking",
    },
  ],
} as const satisfies GreatCourse
