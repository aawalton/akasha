import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersHollowbeast01Kind = {
  id: "01a0de84-4891-7eb1-80e8-213ab3072af1",
  type: "page-type/lore",
  slug: "partners-hollowbeast-01-kind",
  title: "The Gray-Eyed Thing's kind",
  world: "world/personas",
  about: "character-other/partners-hollowbeast-01",
  facts: [
    {
      fact: "The Gray-Eyed Thing was a hollowbeast of the first danger, one alone and of the lowest level.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Every hollowbeast is built as the Gray-Eyed Thing was, and a pack is more of them at higher levels.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Choir can drive a hollowbeast to sever a bond and lure its prey through the break.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Killing the Gray-Eyed Thing read as mercy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Gray-Eyed Thing was drawn to the warmth of bonds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Gray-Eyed Thing was a lone hollowbeast, silent and gray-eyed.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-alan"],
    },
    {
      fact: "The Gray-Eyed Thing is dead: it came straight at Alan, and he met it on ground he chose.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-alan"],
    },
    {
      fact: "Alan's belt-knife strike dropped the Gray-Eyed Thing, and its lunge grazed him as it fell.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-alan"],
    },
  ],
} as const satisfies Lore
