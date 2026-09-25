import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const newApproachesToMixedMediaMaterials = {
  id: "019db533-f39f-7581-b0cc-abfc166e31cd",
  type: "page-type/great-course",
  slug: "new-approaches-to-mixed-media-materials",
  title: "New Approaches to Mixed Media Materials",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 165,
  ownProgress: 165,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "new-approaches-to-mixed-media-materials",
      externalLink: "https://www.thegreatcoursesplus.com/new-approaches-to-mixed-media-materials",
    },
  ],
} as const satisfies GreatCourse
