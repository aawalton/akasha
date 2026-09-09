import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const staminaBar = {
  id: "01a06559-9d65-7732-b183-37e03de50c4e",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "stamina-bar",
  title: "Stamina Bar",
  definition: "what my body has left to move with",
  parents: ["resource-bars"],
  related: ["mana-bar"],
} as const satisfies AllAboutAlanTopic
