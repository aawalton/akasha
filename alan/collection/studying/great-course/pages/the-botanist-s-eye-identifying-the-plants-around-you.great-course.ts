import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theBotanistSEyeIdentifyingThePlantsAroundYou = {
  id: "019db533-f39e-7e39-a561-54e452afb2ff",
  type: "page-type/great-course",
  slug: "the-botanist-s-eye-identifying-the-plants-around-you",
  title: "The Botanist's Eye: Identifying the Plants around You",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 693.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-botanist-s-eye-identifying-the-plants-around-you",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-botanist-s-eye-identifying-the-plants-around-you",
    },
  ],
} as const satisfies GreatCourse
