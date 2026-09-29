import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiMarkeis = {
  id: "01a0ea88-4595-733d-ae54-04273f0aa105",
  type: "page-type/place",
  slug: "otherwhere-xi-markeis",
  title: "Markeis",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-enoria",
  facts: [
    {
      fact: "Markeis is the last Enorian city on the River Shal, on its south shore, halfway to Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Markeis is a lawless slum city of shanties, stench, beggars, thugs and drug dealers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Markeis is run by gangs, whose bosses change by the knife.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Markeis's fortified Haven Inn is one of the few safe beds in the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The temple of Enttiku in Markeis is neutral ground even in that lawless city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Markeis's patrol ships bear a shield-with-fish crest and are corrupt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dream powder is sold in Markeis.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
