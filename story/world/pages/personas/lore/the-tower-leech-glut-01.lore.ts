import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerLeechGlut01 = {
  id: "01a0d44e-84e0-7161-9d25-fe29b1ef2daf",
  type: "page-type/lore",
  slug: "the-tower-leech-glut-01",
  title: "The Glut",
  world: "world/personas",
  about: "character-other/the-tower-leech-glut-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Glut is dead, burned apart at the waterline, and the Cistern's water is empty of it.",
  ],
} as const satisfies Lore
