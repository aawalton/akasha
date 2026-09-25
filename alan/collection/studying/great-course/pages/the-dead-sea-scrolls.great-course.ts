import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theDeadSeaScrolls = {
  id: "019db533-f39e-7a9c-866a-edb45b70481d",
  type: "page-type/great-course",
  slug: "the-dead-sea-scrolls",
  title: "The Dead Sea Scrolls",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 735.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-dead-sea-scrolls",
      externalLink: "https://www.thegreatcoursesplus.com/the-dead-sea-scrolls",
    },
  ],
} as const satisfies GreatCourse
