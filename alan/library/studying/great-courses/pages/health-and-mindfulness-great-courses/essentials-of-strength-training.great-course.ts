import type { GreatCourse } from "../../great-course.page-type.ts"

export const essentialsOfStrengthTraining = {
  id: "019db533-f3a0-7979-a66c-ca3d3822c4c9",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "essentials-of-strength-training",
  title: "Essentials of Strength Training",
  status: "completed",
  rank: "B",
  unit: "minutes",
  ownLength: 219,
  ownProgress: 219,
  partOfCollections: [
    "all-great-courses",
    "health-and-mindfulness-great-courses",
    "hobby-and-personal-pursuits-great-courses",
  ],
  source: "the-great-courses",
  externalId: "essentials-of-strength-training",
  externalLink: "https://www.thegreatcoursesplus.com/essentials-of-strength-training",
} as const satisfies GreatCourse
