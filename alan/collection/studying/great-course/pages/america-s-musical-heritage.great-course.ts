import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const americaSMusicalHeritage = {
  id: "019db533-f3a0-756a-aca4-8d58d6952e5b",
  type: "page-type/great-course",
  slug: "america-s-musical-heritage",
  title: "America's Musical Heritage",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 355.2,
  ownProgress: 355.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "americas-musical-heritage",
      externalLink: "https://www.thegreatcoursesplus.com/americas-musical-heritage",
    },
  ],
} as const satisfies GreatCourse
