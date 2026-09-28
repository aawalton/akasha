import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSpellTiers = {
  id: "01a0e9f3-4d9a-7db8-90f9-b3a6e3962cd2",
  type: "page-type/lore",
  slug: "otherwhere-v-spell-tiers",
  title: "Spell Tiers",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-spell-tiers",
  facts: [
    {
      fact: "Magic is ranked in tiers, and a spell's name can carry its tier, as Moderate Curing does.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Davrar's tiers run from low through moderate to high, with Unique and more above.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Resistances and protections work less well against higher-tier spells.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Top-tier spells carry an aetheric signature; lesser spells do not.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wizardry is the next tier of magic above spellcasting with mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gifted mages can make breakthroughs into the next realm of magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Destroying adamant with Disintegrate is a test of deep magic on the path to wizardry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "True archmages can fly, change the world at a thought, and call on true wizardry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Archmages may have a small grasp of wizardry; lesser mages have none.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Strategic-scale spells that can destroy armies or cities rank above all others.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wind spells are second-year material at the Ascendant Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
