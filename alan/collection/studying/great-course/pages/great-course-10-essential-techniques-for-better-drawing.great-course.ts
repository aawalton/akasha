import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatCourse10EssentialTechniquesForBetterDrawing = {
  id: "019db533-f398-740c-8b15-885c7fc562a4",
  type: "page-type/great-course",
  slug: "great-course-10-essential-techniques-for-better-drawing",
  title: "10 Essential Techniques for Better Drawing",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 153,
  ownProgress: 153,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "10-essential-techniques-for-better-drawing",
      externalLink:
        "https://www.thegreatcoursesplus.com/10-essential-techniques-for-better-drawing",
    },
  ],
} as const satisfies GreatCourse
