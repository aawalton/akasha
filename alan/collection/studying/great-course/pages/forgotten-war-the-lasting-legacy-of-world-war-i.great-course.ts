import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const forgottenWarTheLastingLegacyOfWorldWarI = {
  id: "019db533-f39f-79be-ad80-94d7ef6f3f14",
  type: "page-type/great-course",
  slug: "forgotten-war-the-lasting-legacy-of-world-war-i",
  title: "Forgotten War: The Lasting Legacy of World War I",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 21,
  ownProgress: 21,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "forgotten-war-the-lasting-legacy-of-world-war-i",
      externalLink:
        "https://www.thegreatcoursesplus.com/forgotten-war-the-lasting-legacy-of-world-war-i",
    },
  ],
} as const satisfies GreatCourse
