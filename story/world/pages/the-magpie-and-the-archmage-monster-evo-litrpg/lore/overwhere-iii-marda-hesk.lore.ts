import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiMardaHesk = {
  id: "01a0ed30-5d26-7829-8a83-604f14570fc7",
  type: "page-type/lore",
  slug: "overwhere-iii-marda-hesk",
  title: "Marda Hesk",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-marda-hesk",
  facts: [
    {
      fact: "Marda Hesk keeps the Adventurers Guild post at Merrowgate's south gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is about sixty, gray hair cropped short, broad-shouldered, with a stiff left knee and a cane.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "She was a Silver-rank adventurer, a Warrior of Level 47, until a wyrm's tail broke her knee.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is blunt, dry and fair, and hard to impress; she judges by deeds, never by talk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She registers newcomers, posts quests, pays bounties and tests mana signature cards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She would sign a capable stranger on for temporary registration without papers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is worried sick about the blight and has too few hands to fight it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She keeps a long sword over the desk and can still use it sitting down.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She drinks one cup of cider at noon and none after, and eats at the Crook and Candle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A mana card that lit white-gold for a stranger would make Marda write to Thornmere at once.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marda looked Nala over without expression and asked bluntly what she was after.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-marda-hesk",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
