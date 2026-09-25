import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const trailsOfEvidenceHowForensicScienceWorks = {
  id: "019db533-f39e-7d87-b0db-9c06ff0e9e76",
  type: "page-type/great-course",
  slug: "trails-of-evidence-how-forensic-science-works",
  title: "Trails of Evidence: How Forensic Science Works",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1114.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "course-on-forensic-science-how-to-solve-real-crime-scenes",
      externalLink:
        "https://www.thegreatcoursesplus.com/course-on-forensic-science-how-to-solve-real-crime-scenes",
    },
  ],
} as const satisfies GreatCourse
