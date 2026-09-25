import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const religionInTheAncientMediterraneanWorld = {
  id: "019db533-f39e-7c04-bf5b-0d16261a7854",
  type: "page-type/great-course",
  slug: "religion-in-the-ancient-mediterranean-world",
  title: "Religion in the Ancient Mediterranean World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1468.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "religion-in-the-ancient-mediterranean-world",
      externalLink:
        "https://www.thegreatcoursesplus.com/religion-in-the-ancient-mediterranean-world",
    },
  ],
} as const satisfies GreatCourse
