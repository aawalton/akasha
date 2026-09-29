import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXWarforged = {
  id: "01a0ea79-3e24-7be0-8003-c3a327081cdd",
  type: "page-type/lore",
  slug: "otherwhere-x-warforged",
  title: "Warforged",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-warforged",
  facts: [
    {
      fact: "[Warforged] is a Rare skill, capping at level 30.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is fused from [Mana Reinforcement], [Unarmed Combat] and [Physical Conditioning].",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Its window reads "Warforged - Lvl 1", "Rare", then lists what it was fused from.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It reinforces the body with mana passively and can be pushed further actively.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is an artificial mana layer hardening the skin; the flesh itself is not tougher.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It makes the body tougher, stronger and better at brawling, but it is not a shield.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It gives an instinctive sense of where to strike for most damage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A full [Warforged] punch at Tier 1 craters a boulder twice a man's height.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It keeps a [Mana Reinforcement] aspect that can also reinforce constructs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben is its only known holder, at level 7.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
