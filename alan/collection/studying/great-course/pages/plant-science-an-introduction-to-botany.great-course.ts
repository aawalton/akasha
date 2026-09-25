import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const plantScienceAnIntroductionToBotany = {
  id: "019db533-f39f-714a-8582-f7ec222c1793",
  type: "page-type/great-course",
  slug: "plant-science-an-introduction-to-botany",
  title: "Plant Science: An Introduction to Botany",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 745.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plant-science-an-introduction-to-botany",
      externalLink: "https://www.thegreatcoursesplus.com/plant-science-an-introduction-to-botany",
    },
  ],
} as const satisfies GreatCourse
