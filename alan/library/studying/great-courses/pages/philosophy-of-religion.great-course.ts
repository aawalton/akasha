import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const philosophyOfReligion = {
  id: "019db533-f39e-7a46-bd3d-351c8ecde7ba",
  type: "great-course",
  slug: "philosophy-of-religion",
  title: "Philosophy of Religion",
  status: "not-started",
  unit: "minutes",
  ownLength: 1097.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "philosophy-of-religion",
      externalLink: "https://www.thegreatcoursesplus.com/philosophy-of-religion",
    },
  ],
} as const satisfies GreatCourse
