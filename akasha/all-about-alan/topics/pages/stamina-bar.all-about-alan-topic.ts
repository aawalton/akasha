import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const staminaBar = {
  id: "01a06559-9d65-7732-b183-37e03de50c4e",
  pageTypeSlug: "all-about-alan-topic",
  slug: "stamina-bar",
  title: "Stamina Bar",
  definition: "what my body has left to move with",
  parentSlugs: ["resource-bars"],
  relatedSlugs: ["mana-bar"],
  unsettled:
    "Nothing below zero has surfaced for stamina either, and the same three readings fit as for mana.\n\nHow stamina actually moves is uncaptured: what sleep puts back, what the day takes out, and what fatigue, sleep debt, hunger and thirst do to it.",
} as const satisfies AllAboutAlanTopic
