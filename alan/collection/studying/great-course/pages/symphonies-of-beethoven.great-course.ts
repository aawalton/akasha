import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const symphoniesOfBeethoven = {
  id: "019db533-f3a0-72a4-9c55-038625a36112",
  type: "page-type/great-course",
  slug: "symphonies-of-beethoven",
  title: "Symphonies of Beethoven",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1460.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "symphonies-of-beethoven",
      externalLink: "https://plus.thegreatcourses.com/symphonies-of-beethoven",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
