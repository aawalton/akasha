import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const londonAShortHistoryOfTheGreatestCityInTheWesternWorld = {
  id: "019db533-f3a0-70cc-a770-ec92c732a647",
  type: "page-type/great-course",
  slug: "london-a-short-history-of-the-greatest-city-in-the-western-world",
  title: "London: A Short History of the Greatest City in the Western World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 734.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "london-a-short-history-of-the-greatest-city-in-the-western-world",
      externalLink:
        "https://www.thegreatcoursesplus.com/london-a-short-history-of-the-greatest-city-in-the-western-world",
    },
  ],
} as const satisfies GreatCourse
