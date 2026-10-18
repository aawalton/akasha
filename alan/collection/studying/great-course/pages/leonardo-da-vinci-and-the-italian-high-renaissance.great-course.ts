import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const leonardoDaVinciAndTheItalianHighRenaissance = {
  id: "019db533-f39f-75d6-9c33-72a3ed49478a",
  type: "page-type/great-course",
  slug: "leonardo-da-vinci-and-the-italian-high-renaissance",
  title: "Leonardo da Vinci and the Italian High Renaissance",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 1122,
  ownProgress: 1122,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "leonardo-da-vinci-and-the-italian-high-renaissance",
      externalLink:
        "https://plus.thegreatcourses.com/leonardo-da-vinci-and-the-italian-high-renaissance",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
