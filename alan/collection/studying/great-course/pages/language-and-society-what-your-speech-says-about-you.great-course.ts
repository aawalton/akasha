import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const languageAndSocietyWhatYourSpeechSaysAboutYou = {
  id: "019db533-f39e-7700-9839-4dc597286c47",
  type: "page-type/great-course",
  slug: "language-and-society-what-your-speech-says-about-you",
  title: "Language and Society: What Your Speech Says About You",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 715.2,
  ownProgress: 715.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "language-and-society-what-your-speech-says-about-you",
      externalLink:
        "https://www.thegreatcoursesplus.com/language-and-society-what-your-speech-says-about-you",
    },
  ],
} as const satisfies GreatCourse
