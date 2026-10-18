import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const dogTraining101 = {
  id: "019db533-f39e-7717-a391-e00c4cc908aa",
  type: "page-type/great-course",
  slug: "dog-training-101",
  title: "Dog Training 101",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 755.4,
  ownProgress: 755.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "dog-training-101",
      externalLink: "https://plus.thegreatcourses.com/dog-training-101",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
