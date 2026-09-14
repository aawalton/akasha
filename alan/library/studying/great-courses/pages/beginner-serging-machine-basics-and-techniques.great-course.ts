import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const beginnerSergingMachineBasicsAndTechniques = {
  id: "019db533-f39e-77cb-acc6-68c033a63b68",
  type: "great-course",
  slug: "beginner-serging-machine-basics-and-techniques",
  title: "Beginner Serging: Machine Basics and Techniques",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 259.2,
  ownProgress: 259.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "beginner-serging-machine-basics-and-techniques",
      externalLink:
        "https://www.thegreatcoursesplus.com/beginner-serging-machine-basics-and-techniques",
    },
  ],
} as const satisfies GreatCourse
