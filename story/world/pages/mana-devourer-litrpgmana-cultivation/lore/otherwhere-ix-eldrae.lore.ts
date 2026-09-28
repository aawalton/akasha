import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxEldrae = {
  id: "01a0ea37-83f8-720b-b648-bd29ed62aa7a",
  type: "page-type/lore",
  slug: "otherwhere-ix-eldrae",
  title: "Eldrae",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-eldrae",
  facts: [
    {
      fact: "Eldrae have a four-legged lower half, somewhere between a donkey and an ox.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An eldrae's upper half is humanoid and powerfully muscled.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Outsiders and arena guards often call eldrae centaurs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An eldrae can carry a rider at a charge, and is strong enough to ram a large beast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eldrae captives are bound at both sets of legs to keep them from bolting.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eldrae are sold as slaves in the Sun City dungeon market, some as monster fodder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eldrae tend to prefer running from trouble to running at it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eldrae will still stand by a fighter who protects them, even charging a monster beside him.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
