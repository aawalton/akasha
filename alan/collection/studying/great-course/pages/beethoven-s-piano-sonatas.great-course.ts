import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const beethovenSPianoSonatas = {
  id: "019db533-f3a0-75b4-906c-ce25e8c0d85d",
  type: "page-type/great-course",
  slug: "beethoven-s-piano-sonatas",
  title: "Beethoven's Piano Sonatas",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1098,
  ownProgress: 1098,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/music-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "beethovens-piano-sonatas",
      externalLink: "https://plus.thegreatcourses.com/beethovens-piano-sonatas",
    },
  ],
  createdAt: "2026-04-22T12:39:34.048Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
