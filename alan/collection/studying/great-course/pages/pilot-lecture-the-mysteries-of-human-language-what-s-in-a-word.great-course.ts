import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheMysteriesOfHumanLanguageWhatSInAWord = {
  id: "019db533-f39e-78af-9cd0-e975bf87d03d",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-mysteries-of-human-language-what-s-in-a-word",
  title: "Pilot Lecture: The Mysteries of Human Language—What’s in a Word?",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 28.8,
  ownProgress: 28.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-the-mysteries-of-human-language-what-s-in-a-word",
      externalLink:
        "https://www.thegreatcoursesplus.com/pilot-lecture-the-mysteries-of-human-language-what-s-in-a-word",
    },
  ],
} as const satisfies GreatCourse
