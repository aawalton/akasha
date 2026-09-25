import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const museumMasterpiecesTheNationalGalleryLondon = {
  id: "019db533-f39f-75a0-ba55-0e9efc2fafbf",
  type: "page-type/great-course",
  slug: "museum-masterpieces-the-national-gallery-london",
  title: "Museum Masterpieces: The National Gallery, London",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 738.6,
  ownProgress: 738.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "museum-masterpieces-the-national-gallery-london",
      externalLink:
        "https://www.thegreatcoursesplus.com/museum-masterpieces-the-national-gallery-london",
    },
  ],
} as const satisfies GreatCourse
