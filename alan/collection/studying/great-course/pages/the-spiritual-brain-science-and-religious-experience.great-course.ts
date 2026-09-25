import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theSpiritualBrainScienceAndReligiousExperience = {
  id: "019db533-f3a0-7653-bd0c-c92e78611194",
  type: "page-type/great-course",
  slug: "the-spiritual-brain-science-and-religious-experience",
  title: "The Spiritual Brain: Science and Religious Experience",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 738.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-spiritual-brain-science-and-religious-experience",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-spiritual-brain-science-and-religious-experience",
    },
  ],
} as const satisfies GreatCourse
