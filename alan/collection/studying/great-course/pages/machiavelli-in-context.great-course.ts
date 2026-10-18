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
      externalLink: "https://plus.thegreatcourses.com/machiavelli-in-context",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
