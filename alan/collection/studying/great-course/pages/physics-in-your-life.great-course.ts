import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const physicsInYourLife = {
  id: "019db533-f39f-7229-ac4f-ed5da009df44",
  type: "page-type/great-course",
  slug: "physics-in-your-life",
  title: "Physics in Your Life",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1098,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "physics-in-your-life",
      externalLink: "https://www.thegreatcoursesplus.com/physics-in-your-life",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
