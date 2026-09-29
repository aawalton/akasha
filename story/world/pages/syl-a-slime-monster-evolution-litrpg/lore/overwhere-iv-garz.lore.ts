import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvGarz = {
  id: "01a0ed2a-017a-7dc2-90f7-7f9e88fc6ca5",
  type: "page-type/lore",
  slug: "overwhere-iv-garz",
  title: "Garz",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Garz is the [Chieftain] of a hidden goblin village in a mountain cavern past Southbrook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Identify shows Garz as a Greater Hobgoblin of level 6 and a Warlord of level 33.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garz has evolved twice, killing rival hobgoblins until he evolved again.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garz has fought off evolution madness once and won.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The old chieftain Krutz denied the goblins their evolutions; Krutz is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garz's tribe has no class above intermediate, and only he knows Identify.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some of Garz's tunnel goblins have ashen gray skin from dwelling deep underground.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "The hobgoblin Torkz is Garz's bodyguard.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Garz's goblins revere a Grand Shaman, and one called Slyz came and cowed Garz.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Grand Shaman Slyz took Yuzz and other crafters away from Garz's village.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Garz is brutal, proud and ambitious.", knowers: ["lore-disclosure/game-master"] },
    { fact: "Garz has not attacked Southbrook.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Garz is now in his cavern village, ruling what remains of his tribe.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
