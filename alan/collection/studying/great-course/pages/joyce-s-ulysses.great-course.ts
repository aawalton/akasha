import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const joyceSUlysses = {
  id: "019db533-f387-7fcf-aaa1-8b6b0c8e6000",
  type: "page-type/great-course",
  slug: "joyce-s-ulysses",
  title: "Joyce's “Ulysses”",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 730.616667,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "joyce-s-ulysses",
      externalLink: "https://plus.thegreatcourses.com/joyce-s-ulysses",
    },
  ],
  createdAt: "2026-04-22T12:39:34.023Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
