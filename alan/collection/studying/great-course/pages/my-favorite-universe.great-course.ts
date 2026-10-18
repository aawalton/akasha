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
      externalLink: "https://plus.thegreatcourses.com/my-favorite-universe",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
