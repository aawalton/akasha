import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXTheWiderWorld = {
  id: "01a0ead3-6c44-7b7b-90d6-e78e3538f24f",
  type: "page-type/lore",
  slug: "otherwhere-x-the-wider-world",
  title: "The Wider World as Heartland Folk Tell It",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  facts: [
    {
      fact: "Heartland folk hold four things true of the world: Sulon, the walls, monsters, and rifts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Every child in the Central Plains knows about mana, core and skills; it is common talk.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
    {
      fact: "Most heartland folk live and die without seeing a monster or a rift.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
    {
      fact: "Names of other kingdoms are pedlar talk here: Courat, Bellhame, and the like.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The regional walls ring the Central Plains; folk say one pulses, and none may go through it.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
    {
      fact: "Past the walls lies the wild country where rifts open and monsters come from.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-x-nala",
        "character-other/otherwhere-x-aldous-crane",
      ],
    },
    {
      fact: "A village's news of the wide world comes from pedlars, the mill cart and passing soldiers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Soldiers' fireside tales of monster hunts are the nearest most villagers come to the wilds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
