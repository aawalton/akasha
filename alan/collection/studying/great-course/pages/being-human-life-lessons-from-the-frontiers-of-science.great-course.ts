import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const beingHumanLifeLessonsFromTheFrontiersOfScience = {
  id: "019db533-f39f-7289-b158-c442290ac393",
  type: "page-type/great-course",
  slug: "being-human-life-lessons-from-the-frontiers-of-science",
  title: "Being Human: Life Lessons from the Frontiers of Science",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 356.4,
  ownProgress: 356.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "being-human-life-lessons-from-the-frontiers-of-science",
      externalLink:
        "https://www.thegreatcoursesplus.com/being-human-life-lessons-from-the-frontiers-of-science",
    },
  ],
} as const satisfies GreatCourse
