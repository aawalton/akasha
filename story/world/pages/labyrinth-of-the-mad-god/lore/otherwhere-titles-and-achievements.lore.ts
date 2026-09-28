import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereTitlesAndAchievements = {
  id: "01a0e9d7-0504-7e15-90f7-63462667af96",
  type: "page-type/lore",
  slug: "otherwhere-titles-and-achievements",
  title: "Titles and Achievements",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Titles are rare System honors whose benefits can scale as their conditions grow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hidden achievements reward feats that no one is told to attempt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Species milestones unlock codex entries and pay species and planetary experience.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Milestone bonuses usually come as free attribute points or trait upgrades.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Contestants earn nicknames and honorifics, such as Slayer of Fallen.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
