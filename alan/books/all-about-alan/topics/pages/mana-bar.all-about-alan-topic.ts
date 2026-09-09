import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const manaBar = {
  id: "01a06559-9d65-76ae-bc6b-567b6056571b",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "mana-bar",
  title: "Mana Bar",
  definition: "what my brain has left to start things with",
  parents: ["resource-bars"],
  related: ["stamina-bar"],
} as const satisfies AllAboutAlanTopic
