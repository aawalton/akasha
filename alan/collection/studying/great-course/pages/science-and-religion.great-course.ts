import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const scienceAndReligion = {
  id: "019db533-f39f-701f-a70b-8c32c1c738f9",
  type: "page-type/great-course",
  slug: "science-and-religion",
  title: "Science and Religion",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 374.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "science-and-religion",
      externalLink: "https://plus.thegreatcourses.com/science-and-religion",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
