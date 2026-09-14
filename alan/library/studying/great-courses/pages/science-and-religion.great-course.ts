import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const scienceAndReligion = {
  id: "019db533-f39f-701f-a70b-8c32c1c738f9",
  type: "great-course",
  slug: "science-and-religion",
  title: "Science and Religion",
  status: "not-started",
  unit: "minutes",
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
      externalLink: "https://www.thegreatcoursesplus.com/science-and-religion",
    },
  ],
} as const satisfies GreatCourse
