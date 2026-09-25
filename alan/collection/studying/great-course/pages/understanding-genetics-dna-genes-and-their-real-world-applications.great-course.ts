import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingGeneticsDnaGenesAndTheirRealWorldApplications = {
  id: "019db533-f3a0-765e-b6c5-792ff495b9c4",
  type: "page-type/great-course",
  slug: "understanding-genetics-dna-genes-and-their-real-world-applications",
  title: "Understanding Genetics: DNA, Genes, and Their Real-World Applications",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 729,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-genetics-dna-genes-and-their-real-world-applications",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-genetics-dna-genes-and-their-real-world-applications",
    },
  ],
} as const satisfies GreatCourse
