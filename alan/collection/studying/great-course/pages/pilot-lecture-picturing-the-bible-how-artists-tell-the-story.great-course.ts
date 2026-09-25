import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLecturePicturingTheBibleHowArtistsTellTheStory = {
  id: "019db533-f39f-7948-a76b-342c4ffbf799",
  type: "page-type/great-course",
  slug: "pilot-lecture-picturing-the-bible-how-artists-tell-the-story",
  title: "Pilot Lecture: Picturing the Bible—How Artists Tell the Story",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 30.6,
  ownProgress: 30.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-picturing-the-bible-how-artists-tell-the-story",
      externalLink:
        "https://www.thegreatcoursesplus.com/pilot-lecture-picturing-the-bible-how-artists-tell-the-story",
    },
  ],
} as const satisfies GreatCourse
