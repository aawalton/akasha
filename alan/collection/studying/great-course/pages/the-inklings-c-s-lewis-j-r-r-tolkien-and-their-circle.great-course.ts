import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theInklingsCSLewisJRRTolkienAndTheirCircle = {
  id: "01a06578-671b-7000-8012-dbae1c03265d",
  type: "page-type/great-course",
  slug: "the-inklings-c-s-lewis-j-r-r-tolkien-and-their-circle",
  title: "The Inklings: C. S. Lewis, J. R. R. Tolkien, and Their Circle",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-inklings-c-s-lewis-j-r-r-tolkien-and-their-circle",
      externalLink:
        "https://plus.thegreatcourses.com/the-inklings-c-s-lewis-j-r-r-tolkien-and-their-circle",
    },
  ],
} as const satisfies GreatCourse
