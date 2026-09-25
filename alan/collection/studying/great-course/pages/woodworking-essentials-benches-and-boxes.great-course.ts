import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const woodworkingEssentialsBenchesAndBoxes = {
  id: "019db533-f39e-755c-be70-fb7fb1f2cc3c",
  type: "page-type/great-course",
  slug: "woodworking-essentials-benches-and-boxes",
  title: "Woodworking Essentials: Benches & Boxes",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 184.8,
  ownProgress: 184.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "woodworking-essentials-benches-boxes",
      externalLink: "https://www.thegreatcoursesplus.com/woodworking-essentials-benches-boxes",
    },
  ],
} as const satisfies GreatCourse
