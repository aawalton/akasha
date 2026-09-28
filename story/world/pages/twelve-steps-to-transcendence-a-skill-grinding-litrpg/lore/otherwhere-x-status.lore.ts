import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXStatus = {
  id: "01a0ea72-f82e-7c2a-8461-8a6005030da5",
  type: "page-type/lore",
  slug: "otherwhere-x-status",
  title: "Status Screen",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-status",
  facts: [
    {
      fact: "Everyone gets a status window when the System awakens at fourteen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Awakening at fourteen can bring an innate skill, such as [Focus].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Tier 0 cannot see their own status unaided.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Tier 0's status can be read only with equipment such as an assessment tablet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Villagers speak of other ways to view status, but nobody knows what they are.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Tier 1 person sees their own status just by willing it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reaching Tier 1 links the soul to the world tree and a soul space, enabling status viewing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Tier 1 person still cannot enter or fully access their soul space.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A Tier 0 status reads only Name, Tier and Skills, e.g. "Focus - Lvl 1".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A full status lists Name, Title, Tier, Skills, Constructs and Titles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Status lines read like "Name: Benjamin", "Title: [Hunter]", "Tier: 1".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'From Tier 1 the skills line shows slots used of max, e.g. "Skills (7/10):".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Each skill line shows name and level, e.g. "Focus (Uncommon) - Lvl 17".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The constructs line has its own slot count, e.g. "Constructs (1/10):".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The Titles section lists titles, e.g. "- [Hunter] - Equipped" and "- [Lurker] (13/100)".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Skill rarities stay hidden on status until the holder gains a Rare skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Once a Rare skill is held, every skill line shows its rarity in brackets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Staring at a skill for about a minute opens a small window with no real description.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A fused skill's window shows its rank and the skills it was fused from.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Level-up notices read like "[Focus Lvl 16 > Lvl 17]" and flash at the edge of vision.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A status never shows stats; strength, speed and the like are not given as numbers.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
