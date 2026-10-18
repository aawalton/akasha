import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const essentialsOfStrengthTraining = {
  id: "019db533-f3a0-7979-a66c-ca3d3822c4c9",
  type: "page-type/great-course",
  slug: "essentials-of-strength-training",
  title: "Essentials of Strength Training",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 219,
  ownProgress: 219,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "essentials-of-strength-training",
      externalLink: "https://plus.thegreatcourses.com/essentials-of-strength-training",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
