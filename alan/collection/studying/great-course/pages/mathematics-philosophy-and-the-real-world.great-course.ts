import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const mathematicsPhilosophyAndTheRealWorld = {
  id: "019db533-f3a0-7313-bfe4-129558f301aa",
  type: "page-type/great-course",
  slug: "mathematics-philosophy-and-the-real-world",
  title: "Mathematics, Philosophy, and the “Real World”",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1109.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "mathematics-philosophy-and-the-real-world",
      externalLink: "https://www.thegreatcoursesplus.com/mathematics-philosophy-and-the-real-world",
    },
  ],
} as const satisfies GreatCourse
