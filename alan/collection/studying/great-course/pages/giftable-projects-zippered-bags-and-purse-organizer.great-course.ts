import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const giftableProjectsZipperedBagsAndPurseOrganizer = {
  id: "019db533-f39e-771f-abd8-cfe5d678fec8",
  type: "page-type/great-course",
  slug: "giftable-projects-zippered-bags-and-purse-organizer",
  title: "Giftable Projects: Zippered Bags & Purse Organizer",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 145.8,
  ownProgress: 145.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "giftable-projects-zippered-bags-purse-organizer",
      externalLink:
        "https://www.thegreatcoursesplus.com/giftable-projects-zippered-bags-purse-organizer",
    },
  ],
} as const satisfies GreatCourse
