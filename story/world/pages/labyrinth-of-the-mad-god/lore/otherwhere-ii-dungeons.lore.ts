import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiDungeons = {
  id: "01a0e9a4-b08a-78fd-8a22-0a6677ded52b",
  type: "page-type/lore",
  slug: "otherwhere-ii-dungeons",
  title: "Dungeons",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Dungeons are self-contained zones built around a theme, full of danger and treasure.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dungeons often have a recommended level, and entering early is very risky.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most dungeons end when their boss falls; some have other ways to win.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Everyone inside a dungeon when it is completed receives a reward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some dungeon entrances are marked; others are hidden or need a condition met.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "A dungeon vanishes once it is conquered.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Some dungeons cannot be left until their boss is defeated.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Dungeons have limits on party size.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Items bound to a dungeon's victor come out of it with them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
