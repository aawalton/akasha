import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const thinkingAboutReligionAndViolence = {
  id: "019db533-f39f-770b-92c2-16a611b548ec",
  type: "page-type/great-course",
  slug: "thinking-about-religion-and-violence",
  title: "Thinking about Religion and Violence",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 745.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "thinking-about-religion-and-violence",
      externalLink: "https://www.thegreatcoursesplus.com/thinking-about-religion-and-violence",
    },
  ],
} as const satisfies GreatCourse
