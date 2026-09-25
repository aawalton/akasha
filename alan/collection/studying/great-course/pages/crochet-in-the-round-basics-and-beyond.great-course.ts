import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const crochetInTheRoundBasicsAndBeyond = {
  id: "019db533-f39e-77c4-a768-8cef51a4b381",
  type: "page-type/great-course",
  slug: "crochet-in-the-round-basics-and-beyond",
  title: "Crochet in the Round: Basics & Beyond",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 136.2,
  ownProgress: 136.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "crochet-in-the-round-basics-beyond",
      externalLink: "https://www.thegreatcoursesplus.com/crochet-in-the-round-basics-beyond",
    },
  ],
} as const satisfies GreatCourse
