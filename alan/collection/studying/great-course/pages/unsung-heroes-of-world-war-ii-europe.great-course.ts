import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const unsungHeroesOfWorldWarIiEurope = {
  id: "019db533-f39f-7ad3-9525-f8041d19df1c",
  type: "page-type/great-course",
  slug: "unsung-heroes-of-world-war-ii-europe",
  title: "Unsung Heroes of World War II: Europe",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 358.8,
  ownProgress: 358.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "unsung-heroes-of-world-war-ii-europe",
      externalLink: "https://www.thegreatcoursesplus.com/unsung-heroes-of-world-war-ii-europe",
    },
  ],
} as const satisfies GreatCourse
