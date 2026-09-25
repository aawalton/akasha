import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatQuestionsOfPhilosophyAndPhysics = {
  id: "019db533-f39f-715f-bbf2-728ae5e324ec",
  type: "page-type/great-course",
  slug: "the-great-questions-of-philosophy-and-physics",
  title: "The Great Questions of Philosophy and Physics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 368.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-questions-of-philosophy-and-physics",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-great-questions-of-philosophy-and-physics",
    },
  ],
} as const satisfies GreatCourse
