import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const electricalEngineeringForEveryone = {
  id: "019db533-f39f-70aa-ba55-5785dc127596",
  type: "page-type/great-course",
  slug: "electrical-engineering-for-everyone",
  title: "Electrical Engineering for Everyone",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 756.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "electrical-engineering-for-everyone",
      externalLink: "https://plus.thegreatcourses.com/electrical-engineering-for-everyone",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
