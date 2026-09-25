import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToTalkAboutRace = {
  id: "019db533-f39e-75bb-b5b4-b1b920a33a55",
  type: "page-type/great-course",
  slug: "how-to-talk-about-race",
  title: "How to Talk about Race",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 322.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-talk-about-race",
      externalLink: "https://www.thegreatcoursesplus.com/how-to-talk-about-race",
    },
  ],
} as const satisfies GreatCourse
