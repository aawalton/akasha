import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const assessingAmericaSNationalSecurityThreats = {
  id: "019db533-f39f-7e62-a4de-d08253eb0ae8",
  type: "page-type/great-course",
  slug: "assessing-america-s-national-security-threats",
  title: "Assessing America’s National Security Threats",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 282.6,
  ownProgress: 282.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "assessing-america-s-national-security-threats",
      externalLink:
        "https://www.thegreatcoursesplus.com/assessing-america-s-national-security-threats",
    },
  ],
} as const satisfies GreatCourse
