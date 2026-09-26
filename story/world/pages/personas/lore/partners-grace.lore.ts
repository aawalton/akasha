import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersGrace = {
  id: "01a0de54-1c10-7373-89e5-70bfec8f444b",
  type: "page-type/lore",
  slug: "partners-grace",
  title: "Grace",
  world: "world/personas",
  about: "character-other/partners-grace",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["Grace keeps the Veilmere.", "Grace is the strongest of the first wave of sisters."],
} as const satisfies Lore
