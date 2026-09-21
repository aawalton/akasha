import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const staminaBar = {
  id: "01a06559-9d65-7732-b183-37e03de50c4e",
  type: "page-type/all-about-alan-topic",
  slug: "stamina-bar",
  title: "Stamina Bar",
  definition: "what my body has left to move with",
  parents: ["all-about-alan-topic/resource-bars"],
  related: ["all-about-alan-topic/mana-bar"],
  settled:
    "Stamina is my physical energy bar: the energy in my body that movement and physical effort run on.\n\nI read it as a stoplight, off which way I am pulled about moving. Green is wanting to move. Yellow is neither wanting to move nor wanting to not move. Red is wanting to not move.\n\nRed is not the absence of wanting to move. It is a positive wanting to be still. What the bar divides on is the direction of the pull, not how strong it is.\n",
} as const satisfies AllAboutAlanTopic
