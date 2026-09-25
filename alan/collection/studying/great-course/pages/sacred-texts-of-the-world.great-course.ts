import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const sacredTextsOfTheWorld = {
  id: "019db533-f39e-7c45-8f02-0c1914fa5d93",
  type: "page-type/great-course",
  slug: "sacred-texts-of-the-world",
  title: "Sacred Texts of the World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1098.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "sacred-texts-of-the-world",
      externalLink: "https://www.thegreatcoursesplus.com/sacred-texts-of-the-world",
    },
  ],
} as const satisfies GreatCourse
