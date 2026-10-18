import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const chemistry2ndEdition = {
  id: "019db533-f39f-70f4-8ba8-328d7b2bd75d",
  type: "page-type/great-course",
  slug: "chemistry-2nd-edition",
  title: "Chemistry, 2nd Edition",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1092.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "chemistry-2nd-edition",
      externalLink: "https://plus.thegreatcourses.com/chemistry-2nd-edition",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
