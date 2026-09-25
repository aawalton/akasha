import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const meteorologyAnIntroductionToTheWondersOfTheWeather = {
  id: "019db533-f39e-7c9e-ad13-1b44ec472b4e",
  type: "page-type/great-course",
  slug: "meteorology-an-introduction-to-the-wonders-of-the-weather",
  title: "Meteorology: An Introduction to the Wonders of the Weather",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 740.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "meteorology-an-introduction-to-the-wonders-of-the-weather",
      externalLink:
        "https://www.thegreatcoursesplus.com/meteorology-an-introduction-to-the-wonders-of-the-weather",
    },
  ],
} as const satisfies GreatCourse
