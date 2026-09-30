import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiMaudFerrow = {
  id: "01a0f3b2-49a5-7300-a179-7269ee4dde23",
  type: "page-type/lore",
  slug: "overwhere-iii-maud-ferrow",
  title: "Maud Ferrow",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-maud-ferrow",
  facts: [
    {
      fact: "Maud Ferrow is past fifty, gray-cropped and broad, one of Merrowgate's four Copper adventurers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is a Common, a Warrior of Level 22, and drills the town watch mornings on the south green.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Seeing a stranger run the wall, Maud calls her over and offers her a place in the drill, free.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-maud-ferrow",
      ],
    },
    {
      fact: "Maud's drill is laps, stone-lifting, and staff work with the watch, dawn bell to mid-morning.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-maud-ferrow",
      ],
    },
    {
      fact: "Maud's nephew Wat has a blight scratch on his forearm, and she'd pay 10 copper to see it clean.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The drill-mistress is broad, past fifty, gray hair cropped short, with a Guild ring on her hand.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
  ],
} as const satisfies Lore
