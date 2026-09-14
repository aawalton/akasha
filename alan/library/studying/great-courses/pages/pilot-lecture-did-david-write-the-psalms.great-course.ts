import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const pilotLectureDidDavidWriteThePsalms = {
  id: "019db533-f39e-7c5b-88af-111bfd5b98e9",
  type: "great-course",
  slug: "pilot-lecture-did-david-write-the-psalms",
  title: "Pilot Lecture: Did David Write the Psalms?",
  status: "completed",
  rank: "C",
  unit: "minutes",
  ownLength: 29.4,
  ownProgress: 29.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-did-david-write-the-psalms",
      externalLink:
        "https://www.thegreatcoursesplus.com/wondrium-pilots-did-david-write-the-psalms",
    },
  ],
} as const satisfies GreatCourse
