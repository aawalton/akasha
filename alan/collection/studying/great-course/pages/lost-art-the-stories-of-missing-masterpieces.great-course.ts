import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const lostArtTheStoriesOfMissingMasterpieces = {
  id: "019db533-f39f-756c-97e0-7b8e073c0a83",
  type: "page-type/great-course",
  slug: "lost-art-the-stories-of-missing-masterpieces",
  title: "Lost Art: The Stories of Missing Masterpieces",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 361.8,
  ownProgress: 361.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "lost-art-the-stories-of-missing-masterpieces",
      externalLink:
        "https://www.thegreatcoursesplus.com/lost-art-the-stories-of-missing-masterpieces",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
