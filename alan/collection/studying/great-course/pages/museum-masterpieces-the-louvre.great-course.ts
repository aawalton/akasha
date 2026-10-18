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
      externalLink: "https://plus.thegreatcourses.com/museum-masterpieces-the-louvre",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
