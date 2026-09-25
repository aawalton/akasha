import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const natureOfEarthAnIntroductionToGeology = {
  id: "019db533-f39e-7c54-a276-342ceeb5f794",
  type: "page-type/great-course",
  slug: "nature-of-earth-an-introduction-to-geology",
  title: "Nature of Earth: An Introduction to Geology",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1087.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "nature-of-earth-an-introduction-to-geology",
      externalLink:
        "https://www.thegreatcoursesplus.com/nature-of-earth-an-introduction-to-geology",
    },
  ],
} as const satisfies GreatCourse
