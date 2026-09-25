import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theOpioidEpidemicAmericaSDeadlyAddiction = {
  id: "019db533-f3a0-76c8-bd6e-dc960071467b",
  type: "page-type/great-course",
  slug: "the-opioid-epidemic-america-s-deadly-addiction",
  title: "The Opioid Epidemic: America's Deadly Addiction",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 34.8,
  ownProgress: 34.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-opioid-epidemic-americas-deadly-addiction",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-opioid-epidemic-americas-deadly-addiction",
    },
  ],
} as const satisfies GreatCourse
