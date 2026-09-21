import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howMyAttentionWorks = {
  id: "01a06559-9d65-76e3-b4bb-e0a9f1071107",
  type: "page-type/all-about-alan-topic",
  slug: "how-my-attention-works",
  title: "How My Attention Works",
  definition: "where my attention goes, what holds it, and what it does when I leave it alone",
  parents: ["all-about-alan-topic/alan"],
  settled:
    "What good regulation buys me is attention. When the traffic is moving, what clears is attention I can then spend, and how much of it I have available is the core of the whole thing.\n\nThe total swings by orders of magnitude with how regulated I am, so the same room can be unbearable on one day and empty on another.\n",
} as const satisfies AllAboutAlanTopic
