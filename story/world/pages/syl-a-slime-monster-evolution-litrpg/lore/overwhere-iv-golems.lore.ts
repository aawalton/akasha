import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvGolems = {
  id: "01a0ed36-a768-7d40-83ac-3ba6d78e7925",
  type: "page-type/lore",
  slug: "overwhere-iv-golems",
  title: "Golems",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  about: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Golems are made servants of stone, ore, ice or dungeon brick, run by an enchanted core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Golem cores likely need an affinity that only the Golemancer class grants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Golemancer skills include Golem Control, which levels easily, and Golem Refining, which is slow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Golemancer skills cannot be shared with others as most class skills can.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Storing golems away and summoning them come only late in a Golemancer's growth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An apprentice runs a single golem at first; steady practice can bring three within days.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Golems of permafrost, an ice-and-earth stone, hold together even against magma.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some golems carry Adaptability: brief immunity to repeated harm, in a few slots only.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A golem given [Acting] by skill crystal can play a role like a living servant.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Keldenar hopes a true golem race might one day make its own Mana without a maker.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
