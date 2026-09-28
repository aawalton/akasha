import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxQuests = {
  id: "01a0ea43-e441-7277-9643-f96bda618a0e",
  type: "page-type/lore",
  slug: "otherwhere-ix-quests",
  title: "Quests",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-quests",
  facts: [
    {
      fact: "The system keeps a Quests menu listing a person's active quests and their rewards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A contract made through the system can show in the Quests menu as an active quest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An arena contract listed 'food and amenities' as the reward for a first victory.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The journal tab holds contracts with their current value, which falls as terms are met.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A god with control of the system can set quests for its Champion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Champion quests reward the Champion and strengthen the god both.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Completing quests for a patron god earns Faith points.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Whether Champion quests are mandatory is set by the Champion's contract.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A new Champion\'s first quest is a tutorial: "Walk ten paces".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tutorial quest pays 20 silver pieces and 1 Faith point.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Quest rewards of coin can go straight into an inventory.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Many Champion quests are kill quests against a god's enemies.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A kill quest on a powerful foe can pay hundreds of Faith points.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gods can also lay a divine quest on a beast, which it may accept.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
