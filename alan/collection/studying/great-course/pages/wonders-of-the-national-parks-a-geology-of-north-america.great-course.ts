import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const wondersOfTheNationalParksAGeologyOfNorthAmerica = {
  id: "019db533-f39f-70b4-b40e-d2273d02b45b",
  type: "page-type/great-course",
  slug: "wonders-of-the-national-parks-a-geology-of-north-america",
  title: "Wonders of the National Parks: A Geology of North America",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1128,
  ownProgress: 1128,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wonders-of-the-national-parks-a-geology-of-north-america",
      externalLink:
        "https://www.thegreatcoursesplus.com/wonders-of-the-national-parks-a-geology-of-north-america",
    },
  ],
} as const satisfies GreatCourse
