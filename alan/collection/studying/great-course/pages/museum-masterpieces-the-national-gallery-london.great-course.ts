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
        "https://plus.thegreatcourses.com/museum-masterpieces-the-national-gallery-london",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
