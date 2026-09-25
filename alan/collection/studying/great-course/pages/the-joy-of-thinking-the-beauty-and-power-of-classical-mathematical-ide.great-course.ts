import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theJoyOfThinkingTheBeautyAndPowerOfClassicalMathematicalIde = {
  id: "01a06578-671c-7000-88e7-b65e13f6e900",
  type: "page-type/great-course",
  slug: "the-joy-of-thinking-the-beauty-and-power-of-classical-mathematical-ide",
  title: "The Joy of Thinking: The Beauty and Power of Classical Mathematical Ideas",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-joy-of-thinking-the-beauty-and-power-of-classical-mathematical-ideas",
      externalLink:
        "https://plus.thegreatcourses.com/the-joy-of-thinking-the-beauty-and-power-of-classical-mathematical-ideas",
    },
  ],
} as const satisfies GreatCourse
