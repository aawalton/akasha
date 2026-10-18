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
      externalLink: "https://plus.thegreatcourses.com/unsung-heroes-of-the-ancient-world",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
