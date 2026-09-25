import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const humanPrehistoryAndTheFirstCivilizations = {
  id: "019db533-f39e-7ec4-b716-15711fb458c2",
  type: "page-type/great-course",
  slug: "human-prehistory-and-the-first-civilizations",
  title: "Human Prehistory and the First Civilizations",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1087.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "human-prehistory-and-the-first-civilizations",
      externalLink:
        "https://www.thegreatcoursesplus.com/human-prehistory-and-the-first-civilizations",
    },
  ],
} as const satisfies GreatCourse
