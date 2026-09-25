import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const introductionToPaleontology = {
  id: "019db533-f39f-72be-9282-c6fced567180",
  type: "page-type/great-course",
  slug: "introduction-to-paleontology",
  title: "Introduction to Paleontology",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 754.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "introduction-to-paleontology",
      externalLink: "https://www.thegreatcoursesplus.com/introduction-to-paleontology",
    },
  ],
} as const satisfies GreatCourse
