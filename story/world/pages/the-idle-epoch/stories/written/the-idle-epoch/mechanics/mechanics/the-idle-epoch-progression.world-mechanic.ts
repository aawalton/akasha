import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theIdleEpochProgression = {
  id: "01a10332-4088-72d2-b24c-6fb4dde88695",
  type: "page-type/world-mechanic",
  slug: "the-idle-epoch-progression",
  title: "Progression",
  world: "world/the-idle-epoch",
  description:
    "The Substrate gives every survivor a System window. Essence earned from kills, by hand or by idle constructs, raises a character's level, and each level gives five stat points and three skill points. Intelligence sets a Loopweaver's Script Complexity and Wisdom sets the Idle Yield Multiplier. At level 25 a character may Condense: level, stats and skills reset to level 1, and the character gains prestige shards, a Prestige tier and a permanent 1.5x on all gain rates. Recursion is a hidden stat measuring how far a character's behaviour mirrors the Substrate's own processes.",
} as const satisfies WorldMechanic
