import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pyramidsOfTheWorld = {
  id: "019db533-f387-7f4c-b4ab-83cf07a1415b",
  type: "page-type/great-course",
  slug: "pyramids-of-the-world",
  title: "Pyramids of the World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 364.766667,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pyramids-of-the-world",
      externalLink: "https://plus.thegreatcourses.com/pyramids-of-the-world",
    },
  ],
  createdAt: "2026-04-22T12:39:34.023Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
