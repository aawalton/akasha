import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theMiddleSchoolYears = {
  id: "01a0c9c5-3cad-721f-ba35-0f1f17a52d20",
  type: "page-type/all-about-alan-topic",
  slug: "the-middle-school-years",
  title: "The Middle School Years",
  definition: "what the middle school chapter holds, and the friends I had at each end of it",
  parents: ["all-about-alan-topic/the-chapters-of-my-life"],
  related: [
    "all-about-alan-topic/the-childhood-i-have-written-down",
    "all-about-alan-topic/why-making-things-hurts",
    "all-about-alan-topic/the-friends-i-lost-track-of",
    "all-about-alan-topic/the-years-with-my-parents",
  ],
  settled:
    "Middle school was rough. That is when kids stop being friends with everyone and form cliques, at least that is when it happened for me.\n\nI had half a dozen or so friends through it.\n\nThat is where I got my first A- in a class, and it was devastating. It was a writing class, and I still have creativity scars from it. The art class was the same semester, and the two scarred different creative surfaces.\n\nI had an autistic meltdown over the grade, without knowing at the time what it was, and my teacher was not very helpful about it, which made it worse. It took me weeks to recover from the A-. That is when my parents started repeating that grades are not important and they do not care about my grades, which I took in over time.\n\nThen I went on the road trip for the first semester of high school. I came back and had one friend left, David Eggerstsen.",
} as const satisfies AllAboutAlanTopic
