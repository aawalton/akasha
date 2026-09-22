import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenILearnSomethingNewAboutMyself = {
  id: "01a0c9a7-1cb7-7809-9e1f-4db07f1e8dc4",
  type: "page-type/all-about-alan-topic",
  slug: "when-i-learn-something-new-about-myself",
  title: "When I Learn Something New About Myself",
  definition:
    "knowing a new thing about myself has landed, without knowing the route that got me there",
  parents: ["all-about-alan-topic/how-i-read-myself"],
  related: [
    "all-about-alan-topic/how-one-idea-leads-to-the-next",
    "all-about-alan-topic/what-makes-a-reflection-reach-me",
    "all-about-alan-topic/why-insight-feels-good",
  ],
  settled:
    "I know when I am learning something new about myself, and I know it at the time rather than later, when I would notice I had started acting differently.\n\nWhat I do not know is how exactly to get there.",
} as const satisfies AllAboutAlanTopic
