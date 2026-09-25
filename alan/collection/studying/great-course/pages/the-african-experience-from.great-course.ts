import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theAfricanExperienceFrom = {
  id: "019db533-f39f-7da4-ab01-a546c8ba363d",
  type: "page-type/great-course",
  slug: "the-african-experience-from",
  title: "The African Experience: From",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1098,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-african-eperience-from-lucy-to-mandela",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-african-eperience-from-lucy-to-mandela",
    },
  ],
} as const satisfies GreatCourse
