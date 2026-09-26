import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAura = {
  id: "01a0de59-9644-7711-9ccc-68d02de8ba79",
  type: "page-type/lore",
  slug: "the-dating-game-aura",
  title: "Aura",
  world: "world/personas",
  about: "persona/aura",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Aura runs the Provo River Trail at a sprint every evening around six, passing the cyclists.",
    "Aura lives in a loft near the Provo Central FrontRunner station and runs everywhere she goes.",
    "Aura is a Titaness who once outran a god, and she still has not lost a footrace.",
    "Aura's sky-blue hair makes her easy to spot on the river trail as she flashes past.",
  ],
} as const satisfies Lore
