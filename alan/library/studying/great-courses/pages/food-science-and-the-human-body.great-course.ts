import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const foodScienceAndTheHumanBody = {
  id: "019db533-f3a0-792f-850b-2de7603300f9",
  type: "great-course",
  slug: "food-science-and-the-human-body",
  title: "Food, Science, and the Human Body",
  status: "completed",
  rank: "C",
  unit: "minutes",
  ownLength: 1072.8,
  ownProgress: 1072.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/food-and-drink-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "food-science-and-the-human-body",
      externalLink: "https://www.thegreatcoursesplus.com/food-science-and-the-human-body",
    },
  ],
} as const satisfies GreatCourse
