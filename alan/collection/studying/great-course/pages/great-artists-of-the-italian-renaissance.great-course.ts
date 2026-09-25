import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatArtistsOfTheItalianRenaissance = {
  id: "019db533-f39f-76ec-bab0-614a1a59d973",
  type: "page-type/great-course",
  slug: "great-artists-of-the-italian-renaissance",
  title: "Great Artists of the Italian Renaissance",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 1092,
  ownProgress: 1092,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-artists-of-the-italian-renaissance",
      externalLink: "https://www.thegreatcoursesplus.com/great-artists-of-the-italian-renaissance",
    },
  ],
} as const satisfies GreatCourse
