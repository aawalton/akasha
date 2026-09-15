import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const manaBar = {
  id: "01a06559-9d65-76ae-bc6b-567b6056571b",
  type: "all-about-alan-topic",
  slug: "mana-bar",
  title: "Mana Bar",
  definition: "what my brain has left to start things with",
  parents: ["all-about-alan-topic/resource-bars"],
  related: ["all-about-alan-topic/stamina-bar"],
} as const satisfies AllAboutAlanTopic
