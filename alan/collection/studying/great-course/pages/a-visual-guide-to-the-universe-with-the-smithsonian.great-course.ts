import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aVisualGuideToTheUniverseWithTheSmithsonian = {
  id: "019db533-f39e-7e2e-ab89-2c1370a4727d",
  type: "page-type/great-course",
  slug: "a-visual-guide-to-the-universe-with-the-smithsonian",
  title: "A Visual Guide to the Universe with the Smithsonian",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 546.6,
  ownProgress: 546.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-visual-guide-to-the-universe-with-the-smithsonian",
      externalLink:
        "https://plus.thegreatcourses.com/a-visual-guide-to-the-universe-with-the-smithsonian",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
