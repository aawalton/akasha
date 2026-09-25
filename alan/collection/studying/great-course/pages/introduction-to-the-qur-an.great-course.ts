import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const introductionToTheQurAn = {
  id: "019db533-f39e-7af9-a36f-54b9fb24f11c",
  type: "page-type/great-course",
  slug: "introduction-to-the-qur-an",
  title: "Introduction to the Qur’an",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 353.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "introduction-to-the-quran",
      externalLink: "https://www.thegreatcoursesplus.com/introduction-to-the-quran",
    },
  ],
} as const satisfies GreatCourse
