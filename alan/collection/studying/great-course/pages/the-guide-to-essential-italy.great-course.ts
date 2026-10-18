import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGuideToEssentialItaly = {
  id: "019db533-f39f-7c09-a8d4-02717b8433cd",
  type: "page-type/great-course",
  slug: "the-guide-to-essential-italy",
  title: "The Guide to Essential Italy",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1080,
  ownProgress: 1080,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-guide-to-essential-italy-the-great-courses-plus",
      externalLink:
        "https://plus.thegreatcourses.com/the-guide-to-essential-italy-the-great-courses-plus",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
