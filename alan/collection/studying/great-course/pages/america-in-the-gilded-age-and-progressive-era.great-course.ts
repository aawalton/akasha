import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const americaInTheGildedAgeAndProgressiveEra = {
  id: "019db533-f3a0-7048-b2f5-a28d991bc8cc",
  type: "page-type/great-course",
  slug: "america-in-the-gilded-age-and-progressive-era",
  title: "America in the Gilded Age and Progressive Era",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 729,
  ownProgress: 729,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "america-in-the-gilded-age-and-progressive-era",
      externalLink:
        "https://www.thegreatcoursesplus.com/america-in-the-gilded-age-and-progressive-era",
    },
  ],
} as const satisfies GreatCourse
