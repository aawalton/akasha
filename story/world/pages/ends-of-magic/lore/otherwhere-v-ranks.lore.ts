import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVRanks = {
  id: "01a0e9f5-a5d6-7c9e-991f-48643d63340f",
  type: "page-type/lore",
  slug: "otherwhere-v-ranks",
  title: "Ranks",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-ranks",
  facts: [
    {
      fact: "Talents and utility skills have ranks, shown as a number after the name; class skills have none.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A newly granted skill or Talent starts at a low rank, usually 1.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ranks rise with use, fastest under pressure and danger.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In one hard fight a Talent rose from rank 4 to 10 and new skills reached ranks 3 and 5.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ranks can also be earned by training and drills outside combat, up to a limit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Games that test a skill, such as a chase among guards, earn ranks for all who play.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Resisting fear magic earns ranks in mental-protection skills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Early ranks come easily; later ranks, and Talent ranks above all, come hard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rank 10 is the ceiling; at rank 10 a Talent or utility skill can Develop with Insight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Talent or skill that Develops restarts at rank 1 or 2 under its new name.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A Talent rank-up can come as a box reading "<Talent name> <rank> achieved!"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Example rank-up box line: "Magical Destruction 6 achieved!"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Talent's effect grows with each rank.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
