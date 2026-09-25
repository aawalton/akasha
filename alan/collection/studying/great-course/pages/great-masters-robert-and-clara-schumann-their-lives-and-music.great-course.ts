import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const greatMastersRobertAndClaraSchumannTheirLivesAndMusic = {
  id: "019db533-f388-705b-ba5f-d0384ab14e4a",
  type: "page-type/great-course",
  slug: "great-masters-robert-and-clara-schumann-their-lives-and-music",
  title: "Great Masters: Robert and Clara Schumann—Their Lives and Music",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 375.183333,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "great-masters-robert-and-clara-schumann-their-lives-and-music",
      externalLink:
        "https://www.thegreatcoursesplus.com/great-masters-robert-and-clara-schumann-their-lives-and-music",
    },
  ],
} as const satisfies GreatCourse
