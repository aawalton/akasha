import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const staminaBar = {
  id: "01a06559-9d65-7732-b183-37e03de50c4e",
  type: "all-about-alan-topic",
  slug: "stamina-bar",
  title: "Stamina Bar",
  definition: "what my body has left to move with",
  parents: ["all-about-alan-topic/resource-bars"],
  related: ["all-about-alan-topic/mana-bar"],
} as const satisfies AllAboutAlanTopic
