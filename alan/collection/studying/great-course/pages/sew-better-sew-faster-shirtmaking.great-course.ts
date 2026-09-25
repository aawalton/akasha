import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const sewBetterSewFasterShirtmaking = {
  id: "019db533-f39e-75ca-9383-fe1910953172",
  type: "page-type/great-course",
  slug: "sew-better-sew-faster-shirtmaking",
  title: "Sew Better, Sew Faster: Shirtmaking",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 156.6,
  ownProgress: 156.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "sew-better-sew-faster-shirtmaking",
      externalLink: "https://www.thegreatcoursesplus.com/sew-better-sew-faster-shirtmaking",
    },
  ],
} as const satisfies GreatCourse
