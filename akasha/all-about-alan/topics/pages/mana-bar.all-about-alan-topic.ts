import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const manaBar = {
  id: "01a06559-9d65-76ae-bc6b-567b6056571b",
  pageTypeSlug: "all-about-alan-topic",
  slug: "mana-bar",
  title: "Mana Bar",
  definition: "what my brain has left to start things with",
  parentSlugs: ["resource-bars"],
  relatedSlugs: ["stamina-bar"],
  unsettled:
    "Nothing below zero has surfaced for mana. Three readings still fit: there is no territory below zero, or there is and I have not reached it, or I have reached it and the stoplight is too coarse to show it.",
} as const satisfies AllAboutAlanTopic
