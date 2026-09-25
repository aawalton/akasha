import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theScienceOfEnergyResourcesAndPowerExplained = {
  id: "019db533-f39f-71a0-8456-835d1f2dc4ae",
  type: "page-type/great-course",
  slug: "the-science-of-energy-resources-and-power-explained",
  title: "The Science of Energy: Resources and Power Explained",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 807.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-science-of-energy-resources-and-power-explained",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-science-of-energy-resources-and-power-explained",
    },
  ],
} as const satisfies GreatCourse
