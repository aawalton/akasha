import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howRailwaysTransformedTheWorld = {
  id: "019db533-f3a0-70e5-9a13-5c1e457b6950",
  type: "page-type/great-course",
  slug: "how-railways-transformed-the-world",
  title: "How Railways Transformed the World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 691.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-railways-transformed-the-world",
      externalLink: "https://www.thegreatcoursesplus.com/how-railways-transformed-the-world",
    },
  ],
} as const satisfies GreatCourse
