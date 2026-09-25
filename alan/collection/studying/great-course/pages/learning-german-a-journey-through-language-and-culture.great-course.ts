import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const learningGermanAJourneyThroughLanguageAndCulture = {
  id: "019db533-f39f-74d8-ae6a-ba13c28285bb",
  type: "page-type/great-course",
  slug: "learning-german-a-journey-through-language-and-culture",
  title: "Learning German: A Journey through Language and Culture",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 816,
  ownProgress: 816,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "learning-german-a-journey-through-language-and-culture",
      externalLink:
        "https://www.thegreatcoursesplus.com/learning-german-a-journey-through-language-and-culture",
    },
  ],
} as const satisfies GreatCourse
