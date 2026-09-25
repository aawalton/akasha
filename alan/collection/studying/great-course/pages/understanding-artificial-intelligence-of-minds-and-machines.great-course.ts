import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingArtificialIntelligenceOfMindsAndMachines = {
  id: "01a06578-6719-7006-a1d2-9223de2123bb",
  type: "page-type/great-course",
  slug: "understanding-artificial-intelligence-of-minds-and-machines",
  title: "Understanding Artificial Intelligence: Of Minds and Machines",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-artificial-intelligence-of-minds-and-machines",
      externalLink:
        "https://plus.thegreatcourses.com/understanding-artificial-intelligence-of-minds-and-machines",
    },
  ],
} as const satisfies GreatCourse
