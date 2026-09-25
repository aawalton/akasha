import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theRomanEmpireFromAugustusToTheFallOfRome = {
  id: "019db533-f39f-7c7b-8c6b-975db0bbf815",
  type: "page-type/great-course",
  slug: "the-roman-empire-from-augustus-to-the-fall-of-rome",
  title: "The Roman Empire: From Augustus to The Fall of Rome",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 772.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-roman-empire-from-augustus-to-the-fall-of-rome",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-roman-empire-from-augustus-to-the-fall-of-rome",
    },
  ],
} as const satisfies GreatCourse
