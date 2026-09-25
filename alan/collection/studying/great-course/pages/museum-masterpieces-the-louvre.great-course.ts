import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const museumMasterpiecesTheLouvre = {
  id: "019db533-f39f-7542-b179-3555e41c6f1f",
  type: "page-type/great-course",
  slug: "museum-masterpieces-the-louvre",
  title: "Museum Masterpieces: The Louvre",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 382.8,
  ownProgress: 382.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "museum-masterpieces-the-louvre",
      externalLink: "https://www.thegreatcoursesplus.com/museum-masterpieces-the-louvre",
    },
  ],
} as const satisfies GreatCourse
