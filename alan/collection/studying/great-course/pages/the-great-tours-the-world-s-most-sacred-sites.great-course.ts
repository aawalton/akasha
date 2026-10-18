import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursTheWorldSMostSacredSites = {
  id: "019db533-f398-7388-9274-c90e7f987b1f",
  type: "page-type/great-course",
  slug: "the-great-tours-the-world-s-most-sacred-sites",
  title: "The Great Tours: The World’s Most Sacred Sites",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 708.6,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-the-world-s-most-sacred-sites",
      externalLink:
        "https://plus.thegreatcourses.com/the-great-tours-the-world-s-most-sacred-sites",
    },
  ],
  createdAt: "2026-04-22T12:39:34.040Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
