import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const dateNightFreePlayAura = {
  id: "01a0de0b-fbb4-7cef-89b8-38578e7d335e",
  type: "page-type/lore",
  slug: "date-night-free-play-aura",
  title: "Aura",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Aura runs warm.",
    "Aura has a silvered scar under one breast, and lies about it.",
    "Aura has kept a phone note logging Awen for about eight months.",
    "Aura's note sets down scores and human things in one flat hand.",
    "Aura says she will not clear the 942k score.",
    "Aura says she keeps a scoreboard of everything, and that Awen is just winning.",
    "Aura keeps her everyday keys on a carabiner.",
  ],
} as const satisfies Lore
