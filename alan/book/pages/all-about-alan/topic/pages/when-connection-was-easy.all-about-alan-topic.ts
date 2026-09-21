import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenConnectionWasEasy = {
  id: "01a0c5a7-98fb-7f2e-be2c-f76bc8bce55c",
  type: "page-type/all-about-alan-topic",
  slug: "when-connection-was-easy",
  title: "When Connection Was Easy",
  definition: "the years before the price went up, and what that says about the need now",
  parents: ["all-about-alan-topic/how-far-behind-i-am-on-people"],
  related: [
    "all-about-alan-topic/the-chapters-of-my-life",
    "all-about-alan-topic/what-criticism-does-to-me",
  ],
  settled:
    "In elementary school I expanded socially, to the point of wanting twenty friends at my tenth birthday, and I could name them.\n\nI trusted easily, connected easily, and felt well liked.\n\nSo the need was always there. What changed is the price of meeting it, not the need itself.\n\nThe present difficulty is acquired. The trust and the ease ran freely before the alarm around criticism and twenty years of burnout raised the cost.",
} as const satisfies AllAboutAlanTopic
