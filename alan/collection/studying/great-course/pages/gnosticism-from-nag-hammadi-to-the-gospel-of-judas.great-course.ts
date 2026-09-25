import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const gnosticismFromNagHammadiToTheGospelOfJudas = {
  id: "019db533-f39f-7e97-b6e1-8cbc18750aaf",
  type: "page-type/great-course",
  slug: "gnosticism-from-nag-hammadi-to-the-gospel-of-judas",
  title: "Gnosticism: From Nag Hammadi to the Gospel of Judas",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 778.2,
  ownProgress: 778.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "gnosticism-from-nag-hammadi-to-the-gospel-of-judas",
      externalLink:
        "https://www.thegreatcoursesplus.com/gnosticism-from-nag-hammadi-to-the-gospel-of-judas",
    },
  ],
} as const satisfies GreatCourse
