import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToBoostYourPhysicalAndMentalEnergy = {
  id: "019db533-f3a0-796e-a0a6-f7920f073052",
  type: "page-type/great-course",
  slug: "how-to-boost-your-physical-and-mental-energy",
  title: "How to Boost Your Physical and Mental Energy",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 380.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-boost-your-physical-and-mental-energy",
      externalLink:
        "https://www.thegreatcoursesplus.com/how-to-boost-your-physical-and-mental-energy",
    },
  ],
} as const satisfies GreatCourse
