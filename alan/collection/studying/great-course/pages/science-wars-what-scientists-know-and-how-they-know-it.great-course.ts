import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const scienceWarsWhatScientistsKnowAndHowTheyKnowIt = {
  id: "019db533-f3a0-72f1-b665-b0afabfa0e0d",
  type: "page-type/great-course",
  slug: "science-wars-what-scientists-know-and-how-they-know-it",
  title: "Science Wars: What Scientists Know and How They Know It",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 754.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "science-wars-what-scientists-know-and-how-they-know-it",
      externalLink:
        "https://www.thegreatcoursesplus.com/science-wars-what-scientists-know-and-how-they-know-it",
    },
  ],
} as const satisfies GreatCourse
