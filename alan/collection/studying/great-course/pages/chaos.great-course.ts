import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const chaos = {
  id: "019db533-f39f-7352-a7e4-ebaec20d2199",
  type: "page-type/great-course",
  slug: "chaos",
  title: "Chaos",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 737.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "chaos",
      externalLink: "https://plus.thegreatcourses.com/chaos",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
