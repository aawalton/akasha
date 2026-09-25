import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theTheoryOfEverythingTheQuestToExplainAllReality = {
  id: "019db533-f39f-724a-9874-4a0da5a4a59b",
  type: "page-type/great-course",
  slug: "the-theory-of-everything-the-quest-to-explain-all-reality",
  title: "The Theory of Everything: The Quest to Explain All Reality",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 751.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-theory-of-everything-the-quest-to-explain-all-reality",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-theory-of-everything-the-quest-to-explain-all-reality",
    },
  ],
} as const satisfies GreatCourse
