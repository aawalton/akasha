import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXWolf = {
  id: "01a0ea76-0b82-7097-a691-919b06faa190",
  type: "page-type/lore",
  slug: "otherwhere-x-wolf",
  title: "Wolves: Forest, Horned and Dire",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-species/otherwhere-x-wolf",
  facts: [
    {
      fact: "Forest wolves are massive Tier 1 wolves that hunt in packs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A kill reads "[Tier 1 Forest Wolf slain. Essence gained.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Forest wolves can tear through soldiers' armor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wolves live in the forests of Sulon's frontier and of the Western Plains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A horned wolf, with a horn on its forehead, leads a pack of Tier 1 wolves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A horned wolf has keen senses, a speed skill and high jumps, and predicts a foe's moves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A horned wolf can carry the [Hunter] title, which passes to whoever kills it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'That kill reads "[Tier 1 Horned Wolf slain. Essence gained. Title usurped.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dire wolves roam in packs in the Western Plains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Noble hunting parties hunt dire wolves for combat experience.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wolves joined goblins, trolls and a wyvern loosed by a wyvern spawner in Sulon.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
