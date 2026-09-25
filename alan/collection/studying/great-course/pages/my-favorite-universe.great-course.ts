import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const myFavoriteUniverse = {
  id: "019db533-f39e-7f38-be6b-74b0931e3e7c",
  type: "page-type/great-course",
  slug: "my-favorite-universe",
  title: "My Favorite Universe",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 388.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "my-favorite-universe",
      externalLink: "https://www.thegreatcoursesplus.com/my-favorite-universe",
    },
  ],
} as const satisfies GreatCourse
