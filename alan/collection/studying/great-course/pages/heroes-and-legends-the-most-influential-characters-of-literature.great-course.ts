import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const heroesAndLegendsTheMostInfluentialCharactersOfLiterature = {
  id: "019db533-f39e-78ce-a172-9997a2cdf9b0",
  type: "page-type/great-course",
  slug: "heroes-and-legends-the-most-influential-characters-of-literature",
  title: "Heroes and Legends: The Most Influential Characters of Literature",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 753,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "heroes-and-legends-the-most-influential-characters-of-literature",
      externalLink:
        "https://www.thegreatcoursesplus.com/heroes-and-legends-the-most-influential-characters-of-literature",
    },
  ],
} as const satisfies GreatCourse
