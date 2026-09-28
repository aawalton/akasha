import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBuilds = {
  id: "01a0ea00-21ac-7696-af34-edf45bfe88a7",
  type: "page-type/lore",
  slug: "otherwhere-v-builds",
  title: "Builds",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-builds",
  facts: [
    {
      fact: "A build is a person's chosen combination of Talents, classes and skills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Common build archetypes: monk, cleric, elemental mage, generalist fighter, strategist.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The best build is assembled from many pieces, like a craftsman's many tools.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The first dozen battles shape a build most; once developed it rarely changes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inspection skills let the skilled read another's build by sight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An antimagic build was long thought a short path, soon outmatched by wizardry.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
