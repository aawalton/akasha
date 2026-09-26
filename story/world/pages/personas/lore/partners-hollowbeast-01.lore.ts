import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersHollowbeast01 = {
  id: "01a0de54-1c11-7e33-b1b7-376adf67173b",
  type: "page-type/lore",
  slug: "partners-hollowbeast-01",
  title: "The Gray-Eyed Thing",
  world: "world/personas",
  about: "character-other/partners-hollowbeast-01",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "The Gray-Eyed Thing was a lone hollowbeast, silent and gray-eyed.",
    "The Gray-Eyed Thing is dead: it came straight at Alan, and he met it on ground he chose.",
    "Alan's belt-knife strike dropped the Gray-Eyed Thing, and its lunge grazed him as it fell.",
  ],
} as const satisfies Lore
