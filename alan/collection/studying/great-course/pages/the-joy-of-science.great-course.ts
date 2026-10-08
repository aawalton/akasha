import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theJoyOfScience = {
  id: "019db533-f39f-7234-b625-f4dca7670ea1",
  type: "page-type/great-course",
  slug: "the-joy-of-science",
  title: "The Joy of Science",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1827.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-joy-of-science",
      externalLink: "https://www.thegreatcoursesplus.com/the-joy-of-science",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
