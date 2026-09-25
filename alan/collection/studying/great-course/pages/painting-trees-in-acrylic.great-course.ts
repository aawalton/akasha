import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const paintingTreesInAcrylic = {
  id: "019db533-f39f-7596-a68f-9cdcba0088d1",
  type: "page-type/great-course",
  slug: "painting-trees-in-acrylic",
  title: "Painting Trees in Acrylic",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 167.4,
  ownProgress: 167.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "painting-trees-in-acrylic",
      externalLink: "https://www.thegreatcoursesplus.com/painting-trees-in-acrylic",
    },
  ],
} as const satisfies GreatCourse
