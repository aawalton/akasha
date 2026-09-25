import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatIdeasOfPhilosophy2ndEdition = {
  id: "019db533-f39e-7b8f-a752-c2e889e653b2",
  type: "page-type/great-course",
  slug: "the-great-ideas-of-philosophy-2nd-edition",
  title: "The Great Ideas of Philosophy, 2nd Edition",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1813.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-ideas-of-philosophy-2nd-edition",
      externalLink: "https://www.thegreatcoursesplus.com/the-great-ideas-of-philosophy-2nd-edition",
    },
  ],
} as const satisfies GreatCourse
