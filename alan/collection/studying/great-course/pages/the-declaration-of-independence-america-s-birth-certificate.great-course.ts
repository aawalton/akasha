import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theDeclarationOfIndependenceAmericaSBirthCertificate = {
  id: "01a06578-6718-7003-95ef-7de3db92d78b",
  type: "page-type/great-course",
  slug: "the-declaration-of-independence-america-s-birth-certificate",
  title: "The Declaration of Independence: America’s Birth Certificate",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-declaration-of-independence-america-s-birth-certificate",
      externalLink:
        "https://plus.thegreatcourses.com/the-declaration-of-independence-america-s-birth-certificate",
    },
  ],
} as const satisfies GreatCourse
