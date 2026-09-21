import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyRejectionReadsAsBodilyDanger = {
  id: "01a0c5ec-caa0-7b95-92c4-cb01e9a53f3a",
  type: "page-type/all-about-alan-topic",
  slug: "why-rejection-reads-as-bodily-danger",
  title: "Why Rejection Reads As Bodily Danger",
  definition:
    "the six weeks that fused a stranger turning me away with a stranger who could kill me",
  parents: ["all-about-alan-topic/what-criticism-does-to-me"],
  related: [
    "all-about-alan-topic/why-people-read-as-unsafe",
    "all-about-alan-topic/the-chapters-of-my-life",
  ],
  settled:
    "In my first six weeks in Russia, at about twenty and still fighting for the language, I was held at knifepoint by a drunk for an hour, punched on a subway car, and chased through the streets at night.\n\nIn that window the people who turned me away and the people who could kill me were the same class of event: strangers, unreadable, possibly lethal.\n\nSo a nervous system that learned to treat a stranger's rejection as a threat to my body was reading the truth of where I was. Correct learning, not a misfire.\n\nThat is why the mission's rejections registered as a physical alarm and not only a social one.\n\nRussia is the adult anchor and not the origin. The verdict that people are not safe was already in place from childhood. Russia fused rejection to bodily danger on top of it.",
} as const satisfies AllAboutAlanTopic
