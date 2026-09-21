import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theOneCourseICouldCheck = {
  id: "01a0c5fb-6119-7df4-a2d5-362c5e0481ae",
  type: "page-type/all-about-alan-topic",
  slug: "the-one-course-i-could-check",
  title: "The One Course I Could Check",
  definition: "the linear algebra grade, and why that love came through",
  parents: ["all-about-alan-topic/the-cut-between-what-i-kept-and-what-i-lost"],
  related: [
    "all-about-alan-topic/the-detail-i-do-hold",
    "all-about-alan-topic/what-makes-a-thing-real-to-me",
  ],
  settled:
    "Linear algebra was my favourite course.\n\nIt was a matter of doing simple calculations reliably and consistently. I learned behavioural patterns and self-checks that got it right every single time.\n\nThe university did not give A plus grades, and the class was graded on a curve. I got an A plus anyway, on a final grade of a hundred and four percent.\n\nThat is the positive case on the wall. A love came through because I could verify my way to perfect.\n\nThe self-checks are the perfectionism working with me rather than against me, because maths holds still to be checked.",
} as const satisfies AllAboutAlanTopic
