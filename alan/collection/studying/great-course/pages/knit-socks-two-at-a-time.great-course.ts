import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const knitSocksTwoAtATime = {
  id: "019db533-f39e-75e2-972a-29a1b592479c",
  type: "page-type/great-course",
  slug: "knit-socks-two-at-a-time",
  title: "Knit Socks: Two at a Time!",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 126,
  ownProgress: 126,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "knit-socks-two-at-a-time",
      externalLink: "https://plus.thegreatcourses.com/knit-socks-two-at-a-time",
    },
  ],
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
