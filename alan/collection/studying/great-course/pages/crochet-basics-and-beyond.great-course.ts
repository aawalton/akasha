import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const crochetBasicsAndBeyond = {
  id: "019db533-f39e-7674-afd7-debc393f582e",
  type: "page-type/great-course",
  slug: "crochet-basics-and-beyond",
  title: "Crochet: Basics and Beyond",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 209.4,
  ownProgress: 209.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "crochet-basics-and-beyond",
      externalLink: "https://www.thegreatcoursesplus.com/crochet-basics-and-beyond",
    },
  ],
} as const satisfies GreatCourse
