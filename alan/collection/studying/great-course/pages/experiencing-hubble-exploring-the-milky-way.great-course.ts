import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const experiencingHubbleExploringTheMilkyWay = {
  id: "019db533-f39f-7055-8155-37b86503e52d",
  type: "page-type/great-course",
  slug: "experiencing-hubble-exploring-the-milky-way",
  title: "Experiencing Hubble: Exploring the Milky Way",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 355.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "eperiencing-hubble-eploring-the-milky-way",
      externalLink: "https://www.thegreatcoursesplus.com/eperiencing-hubble-eploring-the-milky-way",
    },
  ],
} as const satisfies GreatCourse
