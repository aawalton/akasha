import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const classicsOfRussianLiterature = {
  id: "019db533-f39f-7f6d-9f83-eae174b70082",
  type: "page-type/great-course",
  slug: "classics-of-russian-literature",
  title: "Classics of Russian Literature",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1085.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "classics-of-russian-literature",
      externalLink: "https://www.thegreatcoursesplus.com/classics-of-russian-literature",
    },
  ],
} as const satisfies GreatCourse
