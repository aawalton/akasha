import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howTheGreatMigrationChangedAmerica = {
  id: "019db533-f39f-799e-8f80-748153edbb00",
  type: "page-type/great-course",
  slug: "how-the-great-migration-changed-america",
  title: "How the Great Migration Changed America",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 344.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-the-great-migration-changed-america",
      externalLink: "https://www.thegreatcoursesplus.com/how-the-great-migration-changed-america",
    },
  ],
} as const satisfies GreatCourse
