import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howTheMediciShapedTheRenaissance = {
  id: "019db533-f3a0-70a0-9551-0ed4c40efa55",
  type: "page-type/great-course",
  slug: "how-the-medici-shaped-the-renaissance",
  title: "How the Medici Shaped the Renaissance",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 366.6,
  ownProgress: 366.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-the-medici-shaped-the-renaissance",
      externalLink: "https://www.thegreatcoursesplus.com/how-the-medici-shaped-the-renaissance",
    },
  ],
} as const satisfies GreatCourse
