import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToCreateComics = {
  id: "019db533-f39e-7708-953a-db8ea0dc09a2",
  type: "page-type/great-course",
  slug: "how-to-create-comics",
  title: "How to Create Comics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 310.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-create-comics",
      externalLink: "https://plus.thegreatcourses.com/how-to-create-comics",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
