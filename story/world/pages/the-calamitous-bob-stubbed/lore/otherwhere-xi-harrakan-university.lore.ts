import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiHarrakanUniversity = {
  id: "01a0ea89-4777-7bb1-8cde-8fadca4fbec2",
  type: "page-type/lore",
  slug: "otherwhere-xi-harrakan-university",
  title: "The Harrakan University of Magic",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-harrakan-university",
  facts: [
    {
      fact: "The Harrakan University of Magic grew from the Remnants' old academy at Frostway.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The air archmage Frosthawk is headmaster of the university.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mage Rakan is the university's dean.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mages from Frostway's school serve in Harrak's army under the blue mage Lana.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
