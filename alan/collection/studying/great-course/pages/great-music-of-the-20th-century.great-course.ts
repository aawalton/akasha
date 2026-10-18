import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMusicOfThe20thCentury = {
  id: "019db533-f3a0-737d-9ae6-b547a11065a9",
  type: "page-type/great-course",
  slug: "great-music-of-the-20th-century",
  title: "Great Music of the 20th Century",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1091.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-music-of-the-20th-century",
      externalLink: "https://plus.thegreatcourses.com/great-music-of-the-20th-century",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
