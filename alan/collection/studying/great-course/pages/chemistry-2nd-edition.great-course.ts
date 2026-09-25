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
      externalLink: "https://www.thegreatcoursesplus.com/chemistry-2nd-edition",
    },
  ],
} as const satisfies GreatCourse
