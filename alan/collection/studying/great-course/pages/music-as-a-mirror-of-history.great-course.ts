import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const musicAsAMirrorOfHistory = {
  id: "019db533-f3a0-72db-baeb-c496441e8ebe",
  type: "page-type/great-course",
  slug: "music-as-a-mirror-of-history",
  title: "Music as a Mirror of History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1102.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "music-as-a-mirror-of-history",
      externalLink: "https://www.thegreatcoursesplus.com/music-as-a-mirror-of-history",
    },
  ],
} as const satisfies GreatCourse
