import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const machiavelliInContext = {
  id: "019db533-f388-7067-9fe1-8dc78761deb4",
  type: "page-type/great-course",
  slug: "machiavelli-in-context",
  title: "Machiavelli in Context",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 736.5,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "machiavelli-in-context",
      externalLink: "https://www.thegreatcoursesplus.com/machiavelli-in-context",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
