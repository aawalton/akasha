import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiPipCarrow = {
  id: "01a0ed30-5d26-746d-86bf-513681186a8a",
  type: "page-type/lore",
  slug: "overwhere-iii-pip-carrow",
  title: "Pip Carrow",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-pip-carrow",
  facts: [
    {
      fact: "Pip Carrow is the reeve's daughter, twelve, small and quick, with a gap in her front teeth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her hair is dyed walnut brown, and a close look shows silver-white at the roots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She wants more than anything to be a mage, and reads every scrap about magic she can find.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She sneaks into the Guild post to read the quest board; Marda pretends not to see.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She asks questions without end, is brave past sense, and keeps any secret she is trusted with.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She would follow anyone who can do real magic, and would try to follow them into the wood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mid-afternoon Pip slips into the post, finds the healer reading, and sits down to ask about magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pip carries word from Brannagh: a carter's dog-bitten wife is coming to the shop at the dusk bell.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-pip-carrow",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
