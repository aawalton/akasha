import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiWrenmarkBeastGuide = {
  id: "01a0f3f9-e46b-7cc4-a175-67ed6b5f44f0",
  type: "page-type/lore",
  slug: "overwhere-iii-wrenmark-beast-guide",
  title: "Wrenmark Beast Guide",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "world-item/overwhere-iii-wrenmark-beast-guide",
  facts: [
    {
      fact: "Jackalope, Level 1-4: strike behind the antlers. Meat 5 copper to Dunstan; antlers 2 a pair.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Snow hare, Level 1-2: flees at a footfall; snare it. Pelt 1 copper.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Frost toad, Level 2-5: spits a numbing cold; strike the pale belly. Skin 3 copper to herbalists.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Ridge fox, Level 3-6: clever, raids coops; farmers pay 5 copper a tail. Winter pelt 8 copper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tree devourer beetle, Level 5-9: strike the soft joint under the head. Shell plates 10 copper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thornwing owl, Level 6-10: hunts by night and throws quills. Fletchers pay 1 copper a quill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wolf, Level 6-12: runs in packs of four to eight. Pelt 15 copper; this winter's bounty 20 a head.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giantmaw hyena, Level 12-18, deep wood only: 'Do not.' Bounty 1 silver a head.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Marda's hand beside the jackalope: 'Antler ground fine goes in Brannagh's mana draught.'",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Hill boar, Level 4-8: charges head-down; step aside and strike the flank. Meat and tusks 12 copper.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
