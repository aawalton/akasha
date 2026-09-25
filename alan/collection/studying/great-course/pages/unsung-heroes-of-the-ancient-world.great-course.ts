import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const unsungHeroesOfTheAncientWorld = {
  id: "019db533-f39f-77bd-98a5-866569256da2",
  type: "page-type/great-course",
  slug: "unsung-heroes-of-the-ancient-world",
  title: "Unsung Heroes of the Ancient World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 803.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "unsung-heroes-of-the-ancient-world",
      externalLink: "https://www.thegreatcoursesplus.com/unsung-heroes-of-the-ancient-world",
    },
  ],
} as const satisfies GreatCourse
