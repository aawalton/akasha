import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const exploringTheRootsOfReligion = {
  id: "019db533-f39e-7ae2-a5b7-090427a24a21",
  type: "page-type/great-course",
  slug: "exploring-the-roots-of-religion",
  title: "Exploring the Roots of Religion",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1098.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "exploring-the-roots-of-religion",
      externalLink: "https://www.thegreatcoursesplus.com/exploring-the-roots-of-religion",
    },
  ],
} as const satisfies GreatCourse
